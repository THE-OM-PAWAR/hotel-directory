'use client';

import { useState } from 'react';
import { Bed, IndianRupee, Package } from 'lucide-react';
import { RoomDrawer } from './room-drawer';

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
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRoomClick = (room: RoomType) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold mb-8">Available Rooms</h2>
        <div className="text-center py-12 bg-brand-gray rounded-2xl border-4 border-brand-black">
          <Bed className="w-16 h-16 mx-auto mb-4 text-brand-blue/30" />
          <p className="text-xl font-bold">No rooms available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
        Available <span className="text-brand-blue">Rooms</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => {
          const coverImage = room.images?.find(img => img.isCover) || room.images?.[0];

          return (
            <button
              key={room._id}
              onClick={() => handleRoomClick(room)}
              className="text-left group"
            >
              <div className="bg-white rounded-2xl border-4 border-brand-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(1,1,5,1)] hover:shadow-[10px_10px_0px_0px_rgba(57,50,216,1)] transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[16/10] relative overflow-hidden bg-brand-gray">
                  {coverImage?.url ? (
                    <img
                      src={coverImage.url}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Bed className="w-12 h-12 text-brand-blue/30" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-brand-blue text-white px-3 py-1.5 rounded-lg border-2 border-brand-black font-bold text-sm flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {room.rent.toLocaleString()}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-sm font-light text-gray-600 line-clamp-2 mb-4">
                    {room.description}
                  </p>

                  {room.components && room.components.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-brand-blue" />
                      <span className="font-medium">{room.components.length} components</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedRoom && (
        <RoomDrawer
          room={selectedRoom}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}
