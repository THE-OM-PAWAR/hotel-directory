'use client';

import Link from 'next/link';
import { Bed, IndianRupee, Package } from 'lucide-react';

interface RoomType {
  _id: string;
  name: string;
  description: string;
  rent: number;
  components: Array<{
    _id: string;
    name: string;
    description: string;
  }>;
  images?: Array<{
    url: string;
    title: string;
    isCover?: boolean;
  }>;
}

interface RoomTypesSectionProps {
  roomTypes: RoomType[];
}

export function RoomTypesSection({ roomTypes }: RoomTypesSectionProps) {
  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8">Available Rooms</h2>
        <div className="text-center py-16 bg-secondary/30 rounded-2xl border-2 border-border">
          <Bed className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-xl font-bold">No rooms available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-slide-up">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Available <span className="text-brand-blue">Rooms</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => {
          const coverImage = room.images?.find(img => img.isCover) || room.images?.[0];

          return (
            <Link key={room._id} href={`/rooms/${room._id}`}>
              <div className="group cursor-pointer">
                <div className="bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-brand-blue transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-[16/10] relative overflow-hidden bg-secondary/30">
                    {coverImage?.url ? (
                      <img
                        src={coverImage.url}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Bed className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-brand-blue text-white px-3 py-1.5 rounded-xl border-2 border-border font-bold text-sm flex items-center gap-1 shadow-lg">
                      <IndianRupee className="w-4 h-4" />
                      {room.rent.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {room.description}
                    </p>

                    {room.components && room.components.length > 0 && (
                      <div className="flex items-center gap-2 text-sm pt-3 border-t border-border">
                        <Package className="w-4 h-4 text-brand-blue" />
                        <span className="font-medium">{room.components.length} components</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
