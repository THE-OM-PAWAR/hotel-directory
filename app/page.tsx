import { Metadata } from 'next';
import { HomePageClient } from './page-client';
import { getBlocksWithHostels } from '@/lib/services/block.service';
import { getRooms } from '@/lib/services/room.service';
import type { RoomDetails } from '@/types/room-details';

export const metadata: Metadata = {
  title: 'GetStay - Best Hostels in Bhopal | PG, Rooms & Student Accommodation',
  description: 'Find the best hostels, PG accommodations, and rooms in Bhopal. Browse verified hostels near coaching centers, colleges, and institutes. Affordable student accommodation with Wi-Fi, food, and security.',
  keywords: 'hostels in Bhopal, PG in Bhopal, student accommodation Bhopal, rooms for rent Bhopal, hostel near me Bhopal, affordable hostels Bhopal, boys hostel Bhopal, girls hostel Bhopal, paying guest Bhopal, coaching hostel Bhopal, hostel near coaching center Bhopal',
};

export default async function Home() {
  // Fetch initial data server-side
  const [blocksData, roomsData] = await Promise.all([
    getBlocksWithHostels().catch(() => []),
    getRooms(1, 12).catch(() => ({ rooms: [], hasMore: false }))
  ]);

  // Convert the rooms data to RoomDetails type
  const typedRooms = (roomsData.rooms || []).map((room: any) => ({
    _id: room._id.toString(),
    name: room.name,
    description: room.description,
    rent: room.rent,
    images: room.images,
    components: room.components || [],
    hostel: {
      _id: room.hostel._id.toString(),
      name: room.hostel.name,
      profile: room.hostel.profile
    },
    block: {
      _id: room.block._id.toString(),
      name: room.block.name,
      profile: room.block.profile
    }
  })) as RoomDetails[];

  return (
    <HomePageClient 
      initialBlocks={blocksData} 
      initialRooms={typedRooms}
      initialHasMore={roomsData.hasMore}
    />
  );
}
