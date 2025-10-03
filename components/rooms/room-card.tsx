'use client';

import { JSX } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Wifi, Car, Heart } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';
import { useState, useEffect } from 'react';

interface RoomCardProps {
  room: IRoomWithDetails;
  onClick: () => void;
  onHostelClick: () => void;
}

export function RoomCard({ room, onClick, onHostelClick }: RoomCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Check if room is saved in localStorage
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
    <Card className="group cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(1,1,5,1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden relative border-4 border-brand-black bg-brand-white">
      <div className="relative" onClick={onClick}>
        <img
          src={coverImage}
          alt={room?.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-brand-white/90 text-brand-black border-2 border-brand-black font-bold">
            {room?.name}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          {isSaved && (
            <div className="bg-brand-white/90 rounded-full p-1.5 border-2 border-brand-black">
              <Heart className="h-4 w-4 text-brand-blue fill-current" />
            </div>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="default" className="bg-brand-blue text-brand-white border-2 border-brand-black font-bold">
            ₹{room?.rent?.toLocaleString() || 'N/A'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Hostel Info */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onHostelClick();
            }}
          >
            <img
              src={hostelProfile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={room?.hostel?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {room?.hostel?.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">
                  {hostelProfile?.basicInfo?.city || 'Location not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="space-y-2" onClick={onClick}>
            {room?.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {room?.description}
              </p>
            )}

            {/* Amenities Preview */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
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

            {/* Accommodation Type */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs border-2 border-brand-black bg-brand-blue-light text-brand-black font-bold">
                {blockProfile?.propertyDetails?.accommodationType || 'Mixed'}
              </Badge>
              <span className="text-xs text-gray-600 font-medium">
                {blockProfile?.propertyDetails?.totalRooms || 0} rooms
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}