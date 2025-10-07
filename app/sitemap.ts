import { MetadataRoute } from 'next';
import connectDB from '@/lib/mongodb/client';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { Block } from '@/lib/mongoose/models/block.model';
import { RoomType } from '@/lib/mongoose/models/room-type.model';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getstay.in';

  try {
    await connectDB();

    const [hostels, blocks, rooms] = await Promise.all([
      Hostel.find().select('_id updatedAt').lean(),
      Block.find().select('_id updatedAt').lean(),
      RoomType.find().select('_id updatedAt').lean(),
    ]);

    const hostelUrls = hostels.map((hostel) => ({
      url: `${baseUrl}/hostels/${hostel._id}`,
      lastModified: hostel.updatedAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    const blockUrls = blocks.map((block) => ({
      url: `${baseUrl}/blocks/${block._id}`,
      lastModified: block.updatedAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    const roomUrls = rooms.map((room) => ({
      url: `${baseUrl}/rooms/${room._id}`,
      lastModified: room.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      ...hostelUrls,
      ...blockUrls,
      ...roomUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
