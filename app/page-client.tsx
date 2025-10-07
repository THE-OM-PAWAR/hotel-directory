'use client';

import { useState, useEffect } from 'react';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { OfferBar } from '@/components/home/offer-bar';
import { Header } from '@/components/home/header';
import { BlocksGrid } from '@/components/home/blocks-grid';
import { RoomsGrid } from '@/components/home/rooms-grid';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { IRoomWithDetails } from '@/types/room';
import { Footer } from '@/components/layout/footer';

export function HomePageClient() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [rooms, setRooms] = useState<IRoomWithDetails[]>([]);
  const [blocksLoading, setBlocksLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsPage, setRoomsPage] = useState(1);
  const [hasMoreRooms, setHasMoreRooms] = useState(false);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await fetch('/api/blocks-with-hostels');
        const data = await response.json();
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
        const response = await fetch(`/api/rooms?page=${roomsPage}&limit=12`);
        const data = await response.json();

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
    <div className="min-h-screen bg-background">
      <Header />
      <OfferBar />
      <HeroCarousel />

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <section className="animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Explore <span className="text-brand-blue">Hostels</span>
            </h2>
            <p className="text-muted-foreground font-light">
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
                  <p className="text-muted-foreground mb-4">No hostels found.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-brand-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all border-2 border-border"
                  >
                    Retry
                  </button>
                </div>
              )}
              <BlocksGrid blocks={blocks} />
            </>
          )}
        </section>

        <section className="animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Available <span className="text-brand-blue">Rooms</span>
            </h2>
            <p className="text-muted-foreground font-light">
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
      <Footer />
    </div>
  );
}
