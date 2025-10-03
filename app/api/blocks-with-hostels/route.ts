import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { registerModels } from '@/lib/mongoose/models/mongoose';

export async function GET() {
  try {
    await connectDB();
    // Register all models to ensure they are available
    registerModels();

    const hostelProfiles = await HostelProfile.find({ isOnlinePresenceEnabled: true })
      .populate('hostel')
      .lean();

    if (!hostelProfiles || hostelProfiles.length === 0) {
      return NextResponse.json({ blocks: [] });
    }

    // Log for debugging - check if any hostel profiles have null hostel references
    const nullHostelCount = hostelProfiles.filter((hp: any) => !hp.hostel).length;
    if (nullHostelCount > 0) {
      console.log(`Warning: ${nullHostelCount} hostel profiles have null hostel references`);
    }

    const hostelIds = hostelProfiles
      .filter((hp: any) => hp.hostel && hp.hostel._id)
      .map((hp: any) => hp.hostel._id);

    if (hostelIds.length === 0) {
      console.log('No valid hostel IDs found after filtering');
      return NextResponse.json({ blocks: [] });
    }

    const blocks = await Block.find({ hostel: { $in: hostelIds } }).lean();

    if (!blocks || blocks.length === 0) {
      return NextResponse.json({ blocks: [] });
    }

    const blockIds = blocks.map((b: any) => b._id);

    const blockProfiles = await BlockProfile.find({ block: { $in: blockIds } }).lean();

    const blockProfileMap = new Map();
    blockProfiles.forEach((bp: any) => {
      blockProfileMap.set(bp.block.toString(), bp);
    });

    const hostelProfileMap = new Map();
    hostelProfiles.forEach((hp: any) => {
      if (hp.hostel && hp.hostel._id) {
        hostelProfileMap.set(hp.hostel._id.toString(), hp);
      }
    });

    const result = blocks
      .filter((block: any) => blockProfileMap.has(block._id.toString()))
      .map((block: any) => {
        const blockProfile = blockProfileMap.get(block._id.toString());
        const hostel = hostelProfiles.find((hp: any) => hp.hostel._id.toString() === block.hostel.toString())?.hostel;
        const hostelProfile = hostelProfileMap.get(block.hostel.toString());

        return {
          block: blockProfile,
          hostel,
          hostelProfile,
        };
      });

    return NextResponse.json({ blocks: result });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blocks' },
      { status: 500 }
    );
  }
}
