import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { registerModels } from '@/lib/mongoose/models/mongoose';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';

export const dynamic = 'force-dynamic';

interface PopulatedBlock {
  _id: string;
  name: string;
  hostel: {
    _id: string;
    name: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    registerModels();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Get hostels with online presence enabled
    const onlineHostels = await HostelProfile.find({ 
      isOnlinePresenceEnabled: true 
    }).select('hostel');

    const hostelIds = onlineHostels.map(profile => profile.hostel);

    // Get blocks from these hostels
    const blocks = await Block.find<{ _id: any }>({ 
      hostel: { $in: hostelIds } 
    }).select('_id');

    const blockIds = blocks.map(block => block._id.toString());

    // Get room types from these blocks with pagination
    const roomTypes = await RoomType.find({ 
      blockId: { $in: blockIds } 
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    // Get additional data for each room type
    const roomsWithDetails = await Promise.all(
      roomTypes.map(async (roomType) => {
        // Find block with populated hostel data
        const block = await Block.findById(roomType.blockId)
          .populate('hostel', 'name _id')
          .lean() as unknown as PopulatedBlock;

        if (!block) {
          return null;
        }

        // Get profiles separately
        const hostelProfile = await HostelProfile.findOne({ 
          hostel: block.hostel._id 
        }).lean();
        
        const blockProfile = await BlockProfile.findOne({ 
          block: block._id 
        }).lean();

        // Get room components if they exist
        let components: any[] = [];
        if (roomType.components && roomType.components.length > 0) {
          components = await RoomComponent.find({
            _id: { $in: roomType.components }
          }).lean();
        }

        return {
          ...roomType.toObject(),
          components,
          hostel: {
            _id: block.hostel._id,
            name: block.hostel.name,
            profile: hostelProfile
          },
          block: {
            _id: block._id,
            name: block.name,
            profile: blockProfile
          }
        };
      })
    );

    // Filter out null results
    const validRooms = roomsWithDetails.filter(room => room !== null);


    // Check if there are more rooms
    const totalCount = await RoomType.countDocuments({ 
      blockId: { $in: blockIds } 
    });
    const hasMore = skip + limit < totalCount;

    return NextResponse.json({
      success: true,
      rooms: validRooms,
      hasMore,
      total: totalCount,
      page,
      limit
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}