'use client';

import { useState, useEffect } from 'react';
import { IBlockProfile } from '@/lib/mongoose/models/block-profile.model';

export function useBlock(blockId: string | null) {
  const [block, setBlock] = useState<IBlockProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!blockId) {
      setBlock(null);
      return;
    }

    const fetchBlock = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blocks/${blockId}`);
        const data = await response.json();
        
        if (data.success) {
          setBlock(data.block);
        }
      } catch (error) {
        console.error('Error fetching block:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [blockId]);

  return { block, loading };
}