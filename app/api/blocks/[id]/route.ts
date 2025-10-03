import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const blockProfile = await BlockProfile.findOne({ block: params.id }).lean();

    if (!blockProfile) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      );
    }

    const block = await Block.findById(params.id).lean();

    if (!block) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      );
    }

    const hostel = await Hostel.findById(block.hostel).lean();
    const hostelProfile = await HostelProfile.findOne({ hostel: block.hostel }).lean();

    return NextResponse.json({
      block: blockProfile,
      hostel,
      hostelProfile,
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    return NextResponse.json(
      { error: 'Failed to fetch block' },
      { status: 500 }
    );
  }
}