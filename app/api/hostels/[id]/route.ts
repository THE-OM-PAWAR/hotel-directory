import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { RoomType } from '@/lib/mongoose/models/room-type.model';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const hostelId = params.id;

    // Get hostel with profile
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return NextResponse.json(
        { success: false, error: 'Hostel not found' },
        { status: 404 }
      );
    }

    const hostelProfile = await HostelProfile.findOne({ hostel: hostelId });

    // Get blocks for this hostel
    const blocks = await Block.find({ hostel: hostelId });

    // Get block profiles and room types for each block
    const blocksWithDetails = await Promise.all(
      blocks.map(async (block: any) => {
        const blockProfile = await BlockProfile.findOne({ block: block._id });
        const roomTypes = await RoomType.find({ blockId: block._id.toString() });

        return {
          _id: block._id,
          name: block.name,
          profile: blockProfile,
          roomTypes
        };
      })
    );

    const hostelWithBlocks = {
      _id: hostel._id,
      name: hostel.name,
      profile: hostelProfile,
      blocks: blocksWithDetails
    };

    return NextResponse.json({
      success: true,
      hostel: hostelWithBlocks
    });

  } catch (error) {
    console.error('Error fetching hostel:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hostel' },
      { status: 500 }
    );
  }
}