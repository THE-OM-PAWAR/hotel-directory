'use client';

import Link from 'next/link';
import { MapPin, Users, Sparkles } from 'lucide-react';

interface BlockCardProps {
  block: {
    _id: string;
    basicInfo: {
      name: string;
      city: string;
      address: string;
    };
    propertyDetails: {
      accommodationType: string;
      totalRooms: number;
    };
    media: {
      photos: Array<{
        url: string;
        isMain?: boolean;
      }>;
    };
  };
  hostelName: string;
  hostelProfile?: {
    media: {
      profileImage?: string;
    };
  };
}

export function BlockCard({ block, hostelName, hostelProfile }: BlockCardProps) {
  const mainPhoto = block.media?.photos?.find(p => p.isMain) || block.media?.photos?.[0];
  const profileImage = hostelProfile?.media?.profileImage;

  return (
    <Link href={`/blocks/${block._id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl border-4 border-brand-black bg-white shadow-[8px_8px_0px_0px_rgba(1,1,5,1)] hover:shadow-[12px_12px_0px_0px_rgba(57,50,216,1)] transition-all duration-300 hover:-translate-y-1">
          <div className="aspect-[4/3] relative overflow-hidden bg-brand-gray">
            {mainPhoto?.url ? (
              <img
                src={mainPhoto.url}
                alt={block.basicInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-brand-blue/30" />
              </div>
            )}

            {profileImage && (
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                <img
                  src={profileImage}
                  alt={hostelName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-brand-blue transition-colors">
                  {block.basicInfo.name}
                </h3>
                <p className="text-sm font-light text-gray-600">{hostelName}</p>
              </div>
              <span className="px-3 py-1 bg-brand-blue-light text-brand-black text-xs font-bold rounded-full border-2 border-brand-black">
                {block.propertyDetails.accommodationType.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{block.basicInfo.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="font-medium">{block.propertyDetails.totalRooms} rooms</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-brand-black">
              <p className="text-xs font-medium text-gray-500 line-clamp-1">
                {block.basicInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface BlocksGridProps {
  blocks: Array<{
    block: BlockCardProps['block'];
    hostel: {
      name: string;
    };
    hostelProfile?: BlockCardProps['hostelProfile'];
  }>;
}

export function BlocksGrid({ blocks }: BlocksGridProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-20">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-brand-blue/30" />
        <h3 className="text-2xl font-bold mb-2">No Hostels Available</h3>
        <p className="text-gray-600">Check back soon for new listings!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blocks.map((item) => (
        <BlockCard
          key={item.block._id}
          block={item.block}
          hostelName={item.hostel.name}
          hostelProfile={item.hostelProfile}
        />
      ))}
    </div>
  );
}
