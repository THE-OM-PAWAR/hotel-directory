'use client';

import { useState, useEffect } from 'react';
import { RoomCard } from '@/components/rooms/room-card';
import { RoomModal } from '@/components/rooms/room-modal';
import { HostelModal } from '@/components/hostels/hostel-modal';
import { BlockDrawer } from '@/components/blocks/block-drawer';
import { Header } from '@/components/layout/header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useRooms } from '@/hooks/use-rooms';
import { IRoomWithDetails } from '@/types/room';

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<IRoomWithDetails | null>(null);
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  
  const { rooms, loading, hasMore, loadMore } = useRooms(page);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        if (hasMore && !loading) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadMore]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Room
          </h1>
          <p className="text-gray-600">
            Discover comfortable and affordable hostel accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onClick={() => setSelectedRoom(room)}
              onHostelClick={() => setSelectedHostel(room.hostel._id)}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {!hasMore && rooms.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No more rooms to load
          </div>
        )}

        {rooms.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No rooms available at the moment</p>
          </div>
        )}
      </main>

      {/* Modals and Drawers */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onHostelClick={() => {
            setSelectedHostel(selectedRoom.hostel._id);
            setSelectedRoom(null);
          }}
          onBlockClick={() => {
            setSelectedBlock(selectedRoom.block._id);
            setSelectedRoom(null);
          }}
        />
      )}

      {selectedHostel && (
        <HostelModal
          hostelId={selectedHostel}
          isOpen={!!selectedHostel}
          onClose={() => setSelectedHostel(null)}
          onBlockClick={(blockId) => {
            setSelectedBlock(blockId);
            setSelectedHostel(null);
          }}
        />
      )}

      {selectedBlock && (
        <BlockDrawer
          blockId={selectedBlock}
          isOpen={!!selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      )}
    </div>
  );
}