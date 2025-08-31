'use client';

import { useState, useEffect } from 'react';

export interface IRoomComponent {
  _id: string;
  name: string;
  description: string;
  blockId: string;
}

export function useRoomComponents(componentIds: string[]) {
  const [components, setComponents] = useState<IRoomComponent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!componentIds || componentIds.length === 0) {
      setComponents([]);
      return;
    }

    const fetchComponents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/room-components', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ componentIds }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setComponents(data.components);
        }
      } catch (error) {
        console.error('Error fetching room components:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [componentIds]);

  return { components, loading };
}