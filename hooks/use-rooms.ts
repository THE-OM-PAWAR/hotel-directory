'use client';

import { useState, useEffect, useCallback } from 'react';
import { IRoomWithDetails } from '@/types/room';

export function useRooms(initialPage: number = 1) {
  const [rooms, setRooms] = useState<IRoomWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchRooms = useCallback(async (page: number, append: boolean = false) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rooms?page=${page}&limit=12`);
      const data = await response.json();
      
      if (data.success) {
        if (append) {
          setRooms(prev => [...prev, ...data.rooms]);
        } else {
          setRooms(data.rooms);
        }
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchRooms(nextPage, true);
  }, [currentPage, fetchRooms]);

  useEffect(() => {
    fetchRooms(1);
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    hasMore,
    loadMore,
    refetch: () => fetchRooms(1)
  };
}