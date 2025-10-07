import { Metadata } from 'next';
import { BlockPageClient } from './block-page-client';
import connectDB from '@/lib/mongodb/client';
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
    const block = await Block.findById(params.id).lean();
    const blockProfile = block ? await BlockProfile.findOne({ blockId: block._id }).lean() : null;
    const hostel = block ? await Hostel.findById(block.hostel).lean() : null;
    const hostelProfile = hostel ? await HostelProfile.findOne({ hostelId: hostel._id }).lean() : null;

    if (!block) {
      return {
        title: 'Block Not Found | GetStay',
        description: 'The accommodation block you are looking for does not exist.',
      };
    }

    const blockName = block.name || 'Block';
    const hostelName = hostel?.name || 'Hostel';
    const city = blockProfile?.basicInfo?.city || hostelProfile?.basicInfo?.city || 'Bhopal';
    const address = blockProfile?.basicInfo?.address || '';
    const landmark = blockProfile?.basicInfo?.landmark || hostelProfile?.basicInfo?.landmark || '';

    const amenities = blockProfile?.amenities
      ?.filter((a: any) => a.available)
      .map((a: any) => a.name)
      .join(', ') || '';

    const accommodationType = blockProfile?.propertyDetails?.accommodationType || 'Mixed';
    const totalRooms = blockProfile?.propertyDetails?.totalRooms || 0;

    const description = `${blockName} at ${hostelName} in ${city}${landmark ? `, near ${landmark}` : ''}. ${accommodationType} accommodation with ${totalRooms} rooms. Features include ${amenities || 'Wi-Fi, security, and modern amenities'}. View rooms and book now.`;

    const keywords = [
      `${blockName} ${hostelName}`,
      `${hostelName} ${city}`,
      `${accommodationType} accommodation ${city}`,
      `hostel in ${city}`,
      `PG near ${city}`,
      ...(landmark ? [`hostel near ${landmark}`, `accommodation near ${landmark}`] : []),
      ...(amenities ? amenities.split(', ').map((a: string) => `${city} hostel with ${a}`) : []),
    ].join(', ');

    return {
      title: `${blockName} - ${hostelName} ${city} | Hostel & PG | GetStay`,
      description,
      keywords,
      openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: `/blocks/${params.id}`,
        title: `${blockName} - ${hostelName} | GetStay`,
        description,
        siteName: 'GetStay',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${blockName} - ${hostelName} | GetStay`,
        description,
      },
      alternates: {
        canonical: `/blocks/${params.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Accommodation Block | GetStay',
      description: 'View accommodation block details and available rooms.',
    };
  }
}

export default function BlockDetailPage({ params }: Props) {
  return <BlockPageClient params={params} />;
}
