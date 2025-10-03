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
        <div className="relative overflow-hidden rounded-2xl border-4 border-brand-black bg-brand-white shadow-[6px_6px_0px_0px_rgba(1,1,5,1)] hover:shadow-[8px_8px_0px_0px_rgba(57,50,216,1)] transition-all duration-300 hover:-translate-y-1 w-[280px] h-[320px] flex flex-col">
          <div className="aspect-[4/3] relative overflow-hidden bg-brand-gray flex-shrink-0">
            {mainPhoto?.url ? (
              <img
                src={mainPhoto.url}
                alt={block.basicInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-brand-blue/30" />
              </div>
            )}

            {profileImage && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-brand-white overflow-hidden bg-brand-white shadow-lg">
                <img
                  src={profileImage}
                  alt={hostelName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-1 group-hover:text-brand-blue transition-colors truncate">
                  {block.basicInfo.name}
                </h3>
                <p className="text-xs text-gray-600 truncate">{hostelName}</p>
              </div>
              <span className="px-2 py-1 bg-brand-blue-light text-brand-black text-xs font-bold rounded-full border-2 border-brand-black ml-2 flex-shrink-0">
                {block.propertyDetails.accommodationType.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{block.basicInfo.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{block.propertyDetails.totalRooms}</span>
              </div>
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
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 mx-auto mb-3 text-brand-blue/30" />
        <h3 className="text-lg font-bold mb-1">No Hostels Available</h3>
        <p className="text-sm text-gray-600">Check back soon for new listings!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
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
