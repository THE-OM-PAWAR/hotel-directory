'use client';

import { RoomCard } from '@/components/rooms/room-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Sparkles } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';

interface RoomsGridProps {
  rooms: IRoomWithDetails[];
  loading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function RoomsGrid({ rooms, loading, onLoadMore, hasMore }: RoomsGridProps) {
  if (loading && rooms.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loading && rooms.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
        <h3 className="text-2xl font-bold mb-2">No Rooms Available</h3>
        <p className="text-muted-foreground">Check back soon for new room listings!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all border-2 border-border shadow-lg"
          >
            {loading ? 'Loading...' : 'Load More Rooms'}
          </button>
        </div>
      )}
    </>
  );
}
