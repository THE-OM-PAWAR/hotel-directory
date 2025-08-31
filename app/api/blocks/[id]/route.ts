import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const blockId = params.id;

    const blockProfile = await BlockProfile.findOne({ block: blockId });

    if (!blockProfile) {
      return NextResponse.json(
        { success: false, error: 'Block profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      block: blockProfile
    });

  } catch (error) {
    console.error('Error fetching block:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch block' },
      { status: 500 }
    );
  }
}