import connectDB from '@/lib/mongodb/client';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { registerModels } from '@/lib/mongoose/models/mongoose';

export async function getBlocksWithHostels() {
  await connectDB();
  registerModels();

  const hostelProfiles = await HostelProfile.find({ isOnlinePresenceEnabled: true })
    .populate('hostel')
    .lean();

  if (!hostelProfiles || hostelProfiles.length === 0) {
    return [];
  }

  const hostelIds = hostelProfiles
    .filter((hp: any) => hp.hostel && hp.hostel._id)
    .map((hp: any) => hp.hostel._id);

  if (hostelIds.length === 0) {
    return [];
  }

  const blocks = await Block.find({ hostel: { $in: hostelIds } }).lean();

  if (!blocks || blocks.length === 0) {
    return [];
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

  return blocks
    .filter((block: any) => blockProfileMap.has(block._id.toString()))
    .map((block: any) => {
      const blockProfile = blockProfileMap.get(block._id.toString());
      const hostel = hostelProfiles.find(
        (hp: any) => hp.hostel && hp.hostel._id && hp.hostel._id.toString() === block.hostel.toString()
      )?.hostel;
      const hostelProfile = hostelProfileMap.get(block.hostel.toString());

      return {
        block: {
          _id: block._id,
          basicInfo: blockProfile.basicInfo,
          propertyDetails: blockProfile.propertyDetails,
          media: blockProfile.media,
        },
        hostel,
        hostelProfile,
      };
    });
}

export async function getBlockById(blockId: string) {
  await connectDB();
  registerModels();

  const block = await Block.findById(blockId).populate('hostel').lean();
  if (!block) {
    return null;
  }

  const blockProfile = await BlockProfile.findOne({ block: blockId }).lean();
  const hostelProfile = await HostelProfile.findOne({ hostel: (block as any).hostel._id }).lean();

  return {
    block: {
      ...block,
      profile: blockProfile,
    },
    hostel: (block as any).hostel,
    hostelProfile,
  };
}
