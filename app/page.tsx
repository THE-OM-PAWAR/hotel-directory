'use client';

import { useState, useEffect } from 'react';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { OfferBar } from '@/components/home/offer-bar';
import { Header } from '@/components/home/header';
import { BlocksGrid } from '@/components/home/blocks-grid';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await fetch('/api/blocks-with-hostels');
        const data = await response.json();
        setBlocks(data.blocks || []);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  return (
    <div className="min-h-screen bg-brand-white">
      <Header />
      <OfferBar />
      <HeroCarousel />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            Explore <span className="text-brand-blue">Hostels</span>
          </h2>
          <p className="text-gray-600 font-light">
            Find your perfect stay from our curated selection
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <BlocksGrid blocks={blocks} />
        )}
      </main>
    </div>
  );
}