'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Wifi, Car, Heart } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';
import { useState, useEffect } from 'react';

interface RoomCardProps {
  room: IRoomWithDetails;
}

export function RoomCard({ room }: RoomCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    setIsSaved(savedRooms.some((savedRoom: any) => savedRoom?._id === room?._id));
  }, [room?._id]);

  const coverImage = room?.images?.find(img => img.isCover)?.url ||
                    room?.images?.[0]?.url ||
                    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400';

  const hostelProfile = room?.hostel?.profile;
  const blockProfile = room?.block?.profile;

  return (
    <Link href={`/rooms/${room._id}`}>
      <Card className="group cursor-pointer hover:border-brand-blue transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden relative border-2 border-border bg-card animate-fade-in">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={coverImage}
            alt={room?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground border-2 border-border font-bold">
              {room?.name}
            </Badge>
          </div>
          {isSaved && (
            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full p-2 border-2 border-border">
              <Heart className="h-4 w-4 text-brand-blue fill-current" />
            </div>
          )}
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-brand-blue text-white border-2 border-border font-bold shadow-lg">
              ₹{room?.rent?.toLocaleString() || 'N/A'}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={hostelProfile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={room?.hostel?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-border"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">
                  {room?.hostel?.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">
                    {hostelProfile?.basicInfo?.city || 'Location not specified'}
                  </span>
                </div>
              </div>
            </div>

            {room?.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {room?.description}
              </p>
            )}

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Block: {room?.block?.name}</span>
              </div>
              {blockProfile?.amenities?.some(a => a.name.toLowerCase().includes('wifi') && a.available) && (
                <div className="flex items-center space-x-1">
                  <Wifi className="h-3 w-3" />
                  <span>WiFi</span>
                </div>
              )}
              {blockProfile?.amenities?.some(a => a.name.toLowerCase().includes('parking') && a.available) && (
                <div className="flex items-center space-x-1">
                  <Car className="h-3 w-3" />
                  <span>Parking</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Badge variant="outline" className="text-xs border-2 border-border bg-secondary/50 text-foreground font-bold">
                {blockProfile?.propertyDetails?.accommodationType || 'Mixed'}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                {blockProfile?.propertyDetails?.totalRooms || 0} rooms
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
