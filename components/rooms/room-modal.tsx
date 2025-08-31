'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageSlider } from '@/components/ui/image-slider';
import { MapPin, Users, Building, Phone, Mail, ArrowRight } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';

interface RoomModalProps {
  room: IRoomWithDetails;
  isOpen: boolean;
  onClose: () => void;
  onHostelClick: () => void;
  onBlockClick: () => void;
}

export function RoomModal({ room, isOpen, onClose, onHostelClick, onBlockClick }: RoomModalProps) {
  const hostelProfile = room.hostel.profile;
  const blockProfile = room.block.profile;

  const images = room.images?.map(img => ({
    url: img.url,
    title: img.title
  })) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{room.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Slider */}
          {images.length > 0 && (
            <div className="w-full h-64 md:h-80">
              <ImageSlider images={images} />
            </div>
          )}

          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Room Description</h3>
                <p className="text-gray-600 leading-relaxed">{room.description}</p>
              </div>

              {/* Components */}
              {room.components && room.components.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Room Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {room.components.map((component: any, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{component.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hostel Info Sidebar */}
            <div className="space-y-4">
              <div 
                className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={onHostelClick}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={hostelProfile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={room.hostel.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{room.hostel.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{hostelProfile?.basicInfo?.city}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                
                {hostelProfile?.basicInfo && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{hostelProfile.basicInfo.contactNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{hostelProfile.basicInfo.email}</span>
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                Contact Hostel
              </Button>
            </div>
          </div>

          <Separator />

          {/* Block Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Block Information</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBlockClick}
              >
                View Block Details
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Block Name</span>
                  <span className="font-medium">{room.block.name}</span>
                </div>
                
                {blockProfile && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Floors</span>
                      <span className="font-medium">{blockProfile.propertyDetails.totalFloors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Rooms</span>
                      <span className="font-medium">{blockProfile.propertyDetails.totalRooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Building Type</span>
                      <Badge variant="outline" className="text-xs">
                        {blockProfile.propertyDetails.buildingType}
                      </Badge>
                    </div>
                  </>
                )}
              </div>

              {blockProfile?.amenities && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Available Amenities</h4>
                  <div className="space-y-1">
                    {blockProfile.amenities
                      .filter(amenity => amenity.available)
                      .slice(0, 4)
                      .map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{amenity.name}</span>
                        </div>
                      ))}
                    {blockProfile.amenities.filter(a => a.available).length > 4 && (
                      <p className="text-xs text-gray-500 mt-1">
                        +{blockProfile.amenities.filter(a => a.available).length - 4} more amenities
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}