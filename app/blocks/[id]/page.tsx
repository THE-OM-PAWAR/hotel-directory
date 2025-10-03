'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/home/header';
import { BlockHeader } from '@/components/blocks/block-header';
import { RoomTypesSection } from '@/components/blocks/room-types-section';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function BlockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blockData, setBlockData] = useState<any>(null);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [blockResponse, roomTypesResponse] = await Promise.all([
          fetch(`/api/blocks/${params.id}`),
          fetch(`/api/room-types/${params.id}`)
        ]);

        if (!blockResponse.ok) {
          throw new Error('Block not found');
        }

        const blockData = await blockResponse.json();
        const roomTypesData = await roomTypesResponse.json();

        setBlockData(blockData);
        setRoomTypes(roomTypesData.roomTypes || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !blockData) {
    return (
      <div className="min-h-screen bg-brand-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Block Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested block could not be found.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-brand-blue text-white rounded-lg font-bold hover:bg-brand-black transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white">
      <Header />

      <button
        onClick={() => router.push('/')}
        className="fixed top-20 left-4 z-40 bg-white p-3 rounded-full border-2 border-brand-black shadow-lg hover:bg-brand-gray transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <BlockHeader
        block={blockData.block}
        hostel={blockData.hostel}
        hostelProfile={blockData.hostelProfile}
      />

      <RoomTypesSection roomTypes={roomTypes} />
    </div>
  );
}
