import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // First, get hostels with online presence enabled
    
    const onlineHostels = await HostelProfile.find({ 
      isOnlinePresenceEnabled: true 
    }).select('hostel');

    const hostelIds = onlineHostels.map(profile => profile.hostel);


    // Get blocks from these hostels
    const blocks = await Block.find({ 
      hostel: { $in: hostelIds } 
    }).select('_id');

    const blockIds = blocks.map(block => block._id as string);

    // Get room types from these blocks with pagination
    const roomTypes = await RoomType.find({ 
      blockId: { $in: blockIds.map(id => id.toString()) } 
    })
    .populate({
      path: 'blockId',
      model: 'Block',
      populate: [
        {
          path: 'hostel',
          model: 'Hostel',
          select: 'name'
        }
      ]
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    // Get additional data for each room type
    const roomsWithDetails = await Promise.all(
      roomTypes.map(async (roomType) => {
        const block = await Block.findById(roomType.blockId)
          .populate<{ hostel: { name: string; _id: string } }>({
            path: 'hostel',
            model: 'Hostel',
            select: 'name _id'
          });
        const hostelProfile = await HostelProfile.findOne({ hostel: block?.hostel });
        const blockProfile = await BlockProfile.findOne({ block: block?._id });

        return {
          ...roomType.toObject(),
          hostel: {
            _id: block?.hostel?._id,
            name: block?.hostel?.name,
            profile: hostelProfile
          },
          block: {
            _id: block?._id,
            name: block?.name,
            profile: blockProfile
          }
        };
      })
    );

    // Check if there are more rooms
    const totalCount = await RoomType.countDocuments({ 
      blockId: { $in: blockIds.map(id => id.toString()) } 
    });
    const hasMore = skip + limit < totalCount;

    return NextResponse.json({
      success: true,
      rooms: roomsWithDetails,
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