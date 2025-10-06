import connectDB from '@/lib/mongodb/client';
import { registerModels } from '@/lib/mongoose/models/mongoose';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';

interface PopulatedBlock {
  _id: string;
  name: string;
  hostel: {
    _id: string;
    name: string;
  };
}

export async function getRooms(page: number = 1, limit: number = 12) {
  await connectDB();
  registerModels();

  const skip = (page - 1) * limit;

  const onlineHostels = await HostelProfile.find({
    isOnlinePresenceEnabled: true,
  }).select('hostel');

  const hostelIds = onlineHostels.map((profile) => profile.hostel);

  const blocks = await Block.find<{ _id: any }>({
    hostel: { $in: hostelIds },
  }).select('_id');

  const blockIds = blocks.map((block) => block._id.toString());

  const roomTypes = await RoomType.find({
    blockId: { $in: blockIds },
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const roomsWithDetails = await Promise.all(
    roomTypes.map(async (roomType) => {
      const block = (await Block.findById(roomType.blockId)
        .populate('hostel', 'name _id')
        .lean()) as unknown as PopulatedBlock;

      if (!block) {
        return null;
      }

      const hostelProfile = await HostelProfile.findOne({
        hostel: block.hostel._id,
      }).lean();

      const blockProfile = await BlockProfile.findOne({
        block: block._id,
      }).lean();

      let components: any[] = [];
      if (roomType.components && roomType.components.length > 0) {
        components = await RoomComponent.find({
          _id: { $in: roomType.components },
        }).lean();
      }

      return {
        ...roomType.toObject(),
        components,
        hostel: {
          _id: block.hostel._id,
          name: block.hostel.name,
          profile: hostelProfile,
        },
        block: {
          _id: block._id,
          name: block.name,
          profile: blockProfile,
        },
      };
    })
  );

  const validRooms = roomsWithDetails.filter((room) => room !== null);

  const totalCount = await RoomType.countDocuments({
    blockId: { $in: blockIds },
  });
  const hasMore = skip + limit < totalCount;

  return {
    rooms: validRooms,
    hasMore,
    total: totalCount,
    page,
    limit,
  };
}
