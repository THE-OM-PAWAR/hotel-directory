'use client';

import { useState, useEffect } from 'react';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { OfferBar } from '@/components/home/offer-bar';
import { Header } from '@/components/home/header';
import { BlocksGrid } from '@/components/home/blocks-grid';
import { RoomsGrid } from '@/components/home/rooms-grid';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { IRoomWithDetails } from '@/types/room';

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [rooms, setRooms] = useState<IRoomWithDetails[]>([]);
  const [blocksLoading, setBlocksLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsPage, setRoomsPage] = useState(1);
  const [hasMoreRooms, setHasMoreRooms] = useState(false);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        console.log('Fetching blocks from API...');
        const response = await fetch('/api/blocks-with-hostels');
        const data = await response.json();
        console.log('API response:', data);
        setBlocks(data.blocks || []);
      } catch (error) {
        console.error('Error fetching blocks:', error);
        setBlocks([]);
      } finally {
        setBlocksLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  useEffect(() => {
    async function fetchRooms() {
      try {
        console.log('Fetching rooms from API...');
        const response = await fetch(`/api/rooms?page=${roomsPage}&limit=12`);
        const data = await response.json();
        console.log('Rooms API response:', data);
        
        if (roomsPage === 1) {
          setRooms(data.rooms || []);
        } else {
          setRooms(prev => [...prev, ...(data.rooms || [])]);
        }
        setHasMoreRooms(data.hasMore || false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        if (roomsPage === 1) {
          setRooms([]);
        }
      } finally {
        setRoomsLoading(false);
      }
    }

    fetchRooms();
  }, [roomsPage]);

  const handleLoadMoreRooms = () => {
    setRoomsPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <Header />
      <OfferBar />
      <HeroCarousel />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Hostels Section */}
        <section className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Explore <span className="text-brand-blue">Hostels</span>
            </h2>
            <p className="text-gray-600 font-light">
              Find your perfect stay from our curated selection
            </p>
          </div>

          {blocksLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {blocks.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600 mb-4">No hostels found. Check console for debugging info.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-brand-blue text-brand-white rounded-lg hover:bg-brand-black transition-colors border-2 border-brand-black"
                  >
                    Retry
                  </button>
                </div>
              )}
              <BlocksGrid blocks={blocks} />
            </>
          )}
        </section>

        {/* Available Rooms Section */}
        <section className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Available <span className="text-brand-blue">Rooms</span>
            </h2>
            <p className="text-gray-600 font-light">
              Browse through our available room options
            </p>
          </div>

          <RoomsGrid 
            rooms={rooms}
            loading={roomsLoading}
            onLoadMore={handleLoadMoreRooms}
            hasMore={hasMoreRooms}
          />
        </section>
      </main>
    </div>
  );
}