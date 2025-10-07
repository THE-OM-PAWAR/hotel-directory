'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { BlockHeader } from '@/components/blocks/block-header';
import { BlockDetails } from '@/components/blocks/block-details';
import { RoomTypesSection } from '@/components/blocks/room-types-section';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Props {
  params: { id: string };
}

export function BlockPageClient({ params }: Props) {
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
      <PageLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (error || !blockData) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Block Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The requested block could not be found.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
          >
            Back to Home
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <button
        onClick={() => router.push('/')}
        className="fixed top-20 left-4 z-40 bg-background/80 backdrop-blur-sm p-3 rounded-xl border-2 border-border shadow-lg hover:bg-background transition-all hover:scale-110 active:scale-95"
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
      <BlockDetails block={blockData.block} />
    </PageLayout>
  );
}
