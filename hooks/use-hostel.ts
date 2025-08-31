'use client';

import { useState, useEffect } from 'react';
import { IHostelWithBlocks } from '@/types/room';

export function useHostel(hostelId: string | null) {
  const [hostel, setHostel] = useState<IHostelWithBlocks | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hostelId) {
      setHostel(null);
      return;
    }

    const fetchHostel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/hostels/${hostelId}`);
        const data = await response.json();
        
        if (data.success) {
          setHostel(data.hostel);
        }
      } catch (error) {
        console.error('Error fetching hostel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [hostelId]);

  return { hostel, loading };
}