import { Metadata } from 'next';
import { RoomPageClient } from './room-page-client';
import connectDB from '@/lib/mongodb/client';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { BlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectDB();
    const room = await RoomType.findById(params.id).populate('components').lean();
    const block = room ? await Block.findById(room.blockId).lean() : null;
    const blockProfile = block ? await BlockProfile.findOne({ blockId: block._id }).lean() : null;
    const hostel = block ? await Hostel.findById(block.hostel).lean() : null;
    const hostelProfile = hostel ? await HostelProfile.findOne({ hostelId: hostel._id }).lean() : null;

    if (!room) {
      return {
        title: 'Room Not Found | GetStay',
        description: 'The room you are looking for does not exist.',
      };
    }

    const roomName = room.name || 'Room';
    const blockName = block?.name || 'Block';
    const hostelName = hostel?.name || 'Hostel';
    const city = blockProfile?.basicInfo?.city || hostelProfile?.basicInfo?.city || 'Bhopal';
    const rent = room.rent || 0;
    const landmark = blockProfile?.basicInfo?.landmark || hostelProfile?.basicInfo?.landmark || '';

    const components = room.components && Array.isArray(room.components)
      ? room.components.map((c: any) => c.name || c).join(', ')
      : '';

    const amenities = blockProfile?.amenities
      ?.filter((a: any) => a.available)
      .map((a: any) => a.name)
      .join(', ') || '';

    const accommodationType = blockProfile?.propertyDetails?.accommodationType || 'Mixed';

    const description = `${roomName} at ${hostelName} in ${city}${landmark ? `, near ${landmark}` : ''}. ${accommodationType} accommodation at ₹${rent.toLocaleString()}/month. ${components ? `Includes ${components}.` : ''} ${amenities ? `Amenities: ${amenities}.` : ''} Book now!`;

    const keywords = [
      `${roomName} ${city}`,
      `room for rent ${city}`,
      `${hostelName} ${city}`,
      `${accommodationType} room ${city}`,
      `PG room ${city}`,
      `hostel room ${city}`,
      `affordable room ${city}`,
      ...(landmark ? [`room near ${landmark}`, `accommodation near ${landmark}`] : []),
      ...(components ? components.split(', ').slice(0, 5) : []),
    ].join(', ');

    const imageUrl = room.images && room.images.length > 0 ? room.images[0].url : '';

    return {
      title: `${roomName} - ₹${rent.toLocaleString()}/month | ${hostelName} ${city} | GetStay`,
      description,
      keywords,
      openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: `/rooms/${params.id}`,
        title: `${roomName} - ₹${rent.toLocaleString()}/month | ${hostelName} | GetStay`,
        description,
        siteName: 'GetStay',
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${roomName} - ₹${rent.toLocaleString()}/month | ${hostelName} | GetStay`,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: `/rooms/${params.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Room | GetStay',
      description: 'View room details and book your accommodation.',
    };
  }
}

export default function RoomDetailPage({ params }: Props) {
  return <RoomPageClient params={params} />;
}
