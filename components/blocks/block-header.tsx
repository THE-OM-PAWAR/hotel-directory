'use client';

import { MapPin, Phone, Mail, Building2 } from 'lucide-react';

interface BlockHeaderProps {
  block: {
    basicInfo: {
      name: string;
      city: string;
      address: string;
      contactNumber: string;
      email: string;
    };
    propertyDetails: {
      accommodationType: string;
      totalFloors: number;
      totalRooms: number;
    };
    media?: {
      photos?: Array<{
        url: string;
        isMain?: boolean;
      }>;
    };
  };
  hostel: {
    name: string;
  };
  hostelProfile?: {
    media?: {
      profileImage?: string;
    };
  };
}

export function BlockHeader({ block, hostel, hostelProfile }: BlockHeaderProps) {
  const mainPhoto = block.media?.photos?.find(p => p.isMain) || block.media?.photos?.[0];

  return (
    <div className="relative">
      <div className="h-[40vh] md:h-[50vh] relative overflow-hidden bg-brand-gray">
        {mainPhoto?.url ? (
          <img
            src={mainPhoto.url}
            alt={block.basicInfo.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-24 h-24 text-brand-blue/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl border-4 border-brand-black shadow-[8px_8px_0px_0px_rgba(1,1,5,1)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {hostelProfile?.media?.profileImage && (
              <div className="w-24 h-24 rounded-2xl border-4 border-brand-black overflow-hidden flex-shrink-0 bg-white">
                <img
                  src={hostelProfile.media.profileImage}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-brand-blue mb-1">{hostel.name}</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                    {block.basicInfo.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{block.basicInfo.city}</span>
                  </div>
                </div>

                <span className="px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-lg border-2 border-brand-black">
                  {block.propertyDetails.accommodationType.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-brand-black">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-light text-gray-500">Total Floors</p>
                    <p className="font-bold">{block.propertyDetails.totalFloors}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-light text-gray-500">Contact</p>
                    <p className="font-bold font-space-mono">{block.basicInfo.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-light text-gray-500">Email</p>
                    <p className="font-bold text-xs">{block.basicInfo.email}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 font-light">
                {block.basicInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
