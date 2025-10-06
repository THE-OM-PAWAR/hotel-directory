'use client';

import Link from 'next/link';
import { MapPin, Users, Sparkles, Building2 } from 'lucide-react';

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
      <div className="group cursor-pointer animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl border-2 border-border bg-card hover:border-brand-blue transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-[280px] flex flex-col">
          <div className="aspect-[4/3] relative overflow-hidden bg-secondary/30 flex-shrink-0">
            {mainPhoto?.url ? (
              <img
                src={mainPhoto.url}
                alt={block.basicInfo.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-12 h-12 text-muted-foreground/30" />
              </div>
            )}

            {profileImage && (
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-background shadow-lg">
                <img
                  src={profileImage}
                  alt={hostelName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-lg border-2 border-border">
                {block.propertyDetails.accommodationType.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-bold group-hover:text-brand-blue transition-colors truncate">
                {block.basicInfo.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate font-medium">{hostelName}</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate font-medium">{block.basicInfo.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="font-medium">{block.propertyDetails.totalRooms}</span>
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
      <div className="text-center py-16 animate-fade-in">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
        <h3 className="text-xl font-bold mb-2">No Hostels Available</h3>
        <p className="text-sm text-muted-foreground">Check back soon for new listings!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
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
