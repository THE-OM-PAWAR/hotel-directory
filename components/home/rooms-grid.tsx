'use client';

import { useState, useEffect } from 'react';
import { RoomCard } from '@/components/rooms/room-card';
import { RoomModal } from '@/components/rooms/room-modal';
import { RoomDrawer } from '@/components/blocks/room-drawer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Sparkles, MapPin, Users, Wifi, Car, Heart } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';

interface RoomsGridProps {
  rooms: IRoomWithDetails[];
  loading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function RoomsGrid({ rooms, loading, onLoadMore, hasMore }: RoomsGridProps) {
  const [selectedRoom, setSelectedRoom] = useState<IRoomWithDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRoomClick = (room: IRoomWithDetails) => {
    setSelectedRoom(room);
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsDrawerOpen(false);
    setSelectedRoom(null);
  };

  const handleHostelClick = () => {
    if (selectedRoom) {
      // Navigate to hostel page or open hostel modal
      console.log('Navigate to hostel:', selectedRoom.hostel._id);
    }
  };

  const handleBlockClick = () => {
    if (selectedRoom) {
      // Navigate to block page
      window.location.href = `/blocks/${selectedRoom.block._id}`;
    }
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loading && rooms.length === 0) {
    return (
      <div className="text-center py-20">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-brand-blue/30" />
        <h3 className="text-2xl font-bold mb-2">No Rooms Available</h3>
        <p className="text-gray-600">Check back soon for new room listings!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            onClick={() => handleRoomClick(room)}
            onHostelClick={handleHostelClick}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-brand-blue text-brand-white rounded-lg font-bold hover:bg-brand-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-2 border-brand-black"
          >
            {loading ? 'Loading...' : 'Load More Rooms'}
          </button>
        </div>
      )}

      {/* Desktop Modal */}
      {selectedRoom && !isMobile && (
        <RoomModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={handleClose}
          onHostelClick={handleHostelClick}
          onBlockClick={handleBlockClick}
        />
      )}

      {/* Mobile Drawer */}
      {selectedRoom && isMobile && (
        <RoomDrawer
          room={{
            _id: selectedRoom._id,
            name: selectedRoom.name,
            description: selectedRoom.description || '',
            rent: selectedRoom.rent || 0,
            components: Array.isArray(selectedRoom.components) 
              ? selectedRoom.components.map((comp: any) => ({
                  _id: comp._id || comp.toString(),
                  name: comp.name || 'Component',
                  description: comp.description || 'Room component'
                }))
              : [],
            images: selectedRoom.images || []
          }}
          isOpen={isDrawerOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}
