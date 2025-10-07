import { Metadata } from 'next';
import { HostelPageClient } from './hostel-page-client';
import connectDB from '@/lib/mongodb/client';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectDB();
    const hostel = await Hostel.findById(params.id).lean();
    const profile = hostel ? await HostelProfile.findOne({ hostelId: hostel._id }).lean() : null;

    if (!hostel) {
      return {
        title: 'Hostel Not Found | GetStay',
        description: 'The hostel you are looking for does not exist.',
      };
    }

    const hostelName = hostel.name || 'Hostel';
    const city = profile?.basicInfo?.city || 'Bhopal';
    const address = profile?.basicInfo?.address || '';
    const facilities = profile?.propertyDetails?.facilities
      ?.filter((f: any) => f.available)
      .map((f: any) => f.name)
      .join(', ') || '';

    const accommodationType = profile?.propertyDetails?.type || 'Mixed';
    const landmark = profile?.basicInfo?.landmark || '';

    const description = `${hostelName} in ${city}${landmark ? `, near ${landmark}` : ''}. ${accommodationType} accommodation with facilities including ${facilities || 'Wi-Fi, food, and security'}. View rooms, amenities, and book your stay.`;

    const keywords = [
      `${hostelName}`,
      `${hostelName} ${city}`,
      `hostel in ${city}`,
      `${accommodationType} hostel ${city}`,
      `PG in ${city}`,
      ...(landmark ? [`hostel near ${landmark}`] : []),
      ...(facilities ? facilities.split(', ').map((f: string) => `${city} hostel with ${f}`) : []),
    ].join(', ');

    return {
      title: `${hostelName} - ${city} | Best Hostel & PG Accommodation | GetStay`,
      description,
      keywords,
      openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: `/hostels/${params.id}`,
        title: `${hostelName} - ${city} | GetStay`,
        description,
        siteName: 'GetStay',
        images: profile?.media?.bannerImage ? [{ url: profile.media.bannerImage }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${hostelName} - ${city} | GetStay`,
        description,
        images: profile?.media?.bannerImage ? [profile.media.bannerImage] : [],
      },
      alternates: {
        canonical: `/hostels/${params.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Hostel | GetStay',
      description: 'View hostel details and book your accommodation.',
    };
  }
}

export default function HostelPage({ params }: Props) {
  return <HostelPageClient params={params} />;
}
