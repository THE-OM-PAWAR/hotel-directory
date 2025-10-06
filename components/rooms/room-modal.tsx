'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageSlider } from '@/components/ui/image-slider';
import { RoomCard } from '@/components/rooms/room-card';
import { MapPin, Phone, Mail, Heart, ExternalLink, Building, Users, Shield, Calendar } from 'lucide-react';
import { IRoomWithDetails } from '@/types/room';
import { useHostel } from '@/hooks/use-hostel';
import { useState, useEffect } from 'react';

interface RoomModalProps {
  room: IRoomWithDetails;
  isOpen: boolean;
  onClose: () => void;
  onHostelClick: () => void;
  onBlockClick: () => void;
}

export function RoomModal({ room, isOpen, onClose, onHostelClick, onBlockClick }: RoomModalProps) {
  const { hostel } = useHostel(room.hostel._id);
  const [isSaved, setIsSaved] = useState(false);

  const hostelProfile = room.hostel.profile;
  const blockProfile = room.block.profile;

  // Check if room is saved in localStorage
  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    setIsSaved(savedRooms.some((savedRoom: any) => savedRoom._id === room._id));
  }, [room._id]);

  const handleSaveRoom = () => {
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    
    if (isSaved) {
      // Remove from saved
      const updatedRooms = savedRooms.filter((savedRoom: any) => savedRoom._id !== room._id);
      localStorage.setItem('savedRooms', JSON.stringify(updatedRooms));
      setIsSaved(false);
    } else {
      // Add to saved
      savedRooms.push(room);
      localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
      setIsSaved(true);
    }
  };

  const images = room.images?.map(img => ({
    url: img.url,
    title: img.title
  })) || [];

  // Get other room types from the same block
  const otherRoomTypes = (hostel?.blocks
    .find(block => block._id === room.block._id)
    ?.roomTypes.filter(roomType => roomType._id !== room._id) || []) as IRoomWithDetails[];

  const blockImages = blockProfile?.media?.photos?.map(photo => ({
    url: photo.url,
    title: photo.title,
    description: photo.description
  })) || [];

  console.log(room.components)

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] lg:h-[85vh] lg:w-[30vw] m-auto ">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl font-bold">{room.name}</DrawerTitle>
          <div className="flex items-center text-gray-500 text-sm">
            <Building className="h-4 w-4 mr-1" />
            <span>{room.block.name} • {room.hostel.name}</span>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            {/* Room Images */}
            {images.length > 0 && (
              <div className="w-full h-full " style={{ aspectRatio: '3/4', maxHeight: '400px' }}>
                <ImageSlider images={images} />
              </div>
            )}

            {/* Room Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Room Features - Horizontal Scroll */}
            {room.components && room.components.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Room Features</h3>
                <ScrollArea className="w-full [&>div>div]:flex [&>div>div]:flex-row">
                  <div className="flex space-x-3 pb-2">
                    {room.components.map((component: any, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg min-w-fit">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-emerald-700">{component.name}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 h-auto py-3"
                onClick={() => {
                  if (blockProfile?.locationInfo?.googleMapLink) {
                    window.open(blockProfile.locationInfo.googleMapLink, '_blank');
                  }
                }}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Location</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 h-auto py-3"
                onClick={() => {
                  if (blockProfile?.basicInfo?.contactNumber) {
                    window.open(`tel:${blockProfile.basicInfo.contactNumber}`, '_self');
                  }
                }}
              >
                <Phone className="h-4 w-4" />
                <span className="text-xs">Call</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 h-auto py-3"
                onClick={() => {
                  if (blockProfile?.basicInfo?.email) {
                    window.open(`mailto:${blockProfile.basicInfo.email}`, '_self');
                  }
                }}
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs">Email</span>
              </Button>

              <Button
                variant={isSaved ? "default" : "outline"}
                size="sm"
                className="flex flex-col items-center space-y-1 h-auto py-3"
                onClick={handleSaveRoom}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="text-xs">{isSaved ? 'Saved' : 'Save'}</span>
              </Button>
            </div>

            {/* Hostel Info */}
            <div 
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={onHostelClick}
            >
              <img
                src={hostelProfile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={room.hostel.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{room.hostel.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{hostelProfile?.basicInfo?.city || 'Location not specified'}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>

            {/* Other Room Types */}
            {otherRoomTypes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Other Room Types in This Block</h3>
                <ScrollArea className="w-full">
                  <div className="flex space-x-4 pb-2">
                    {otherRoomTypes.map((roomType) => (
                      <div key={roomType._id} className="min-w-[280px]">
                        <RoomCard room={roomType as IRoomWithDetails} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Block Information */}
            {blockProfile && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">About {room.block.name}</h3>
                  <Button variant="outline" size="sm" onClick={onBlockClick}>
                    View Full Details
                  </Button>
                </div>

                {/* Block Description */}
                {blockProfile.basicInfo?.description && (
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      {blockProfile.basicInfo.description}
                    </p>
                  </div>
                )}

                {/* Property Details Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Property Overview</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This {blockProfile.propertyDetails?.buildingType || 'building'} offers {blockProfile.propertyDetails?.accommodationType || 'mixed'} accommodation 
                    with {blockProfile.propertyDetails?.totalRooms || 0} rooms across {blockProfile.propertyDetails?.totalFloors || 0} floors.
                    {blockProfile.propertyDetails?.establishedYear && ` Established in ${blockProfile.propertyDetails.establishedYear}.`}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                  <div className="text-gray-600 text-sm">
                    <p>{blockProfile.basicInfo?.address}</p>
                    {blockProfile.basicInfo?.landmark && (
                      <p className="text-gray-500">Near {blockProfile.basicInfo.landmark}</p>
                    )}
                    <p>{blockProfile.basicInfo?.city}, {blockProfile.basicInfo?.state} - {blockProfile.basicInfo?.pincode}</p>
                  </div>
                </div>

                {/* Available Amenities */}
                {blockProfile.amenities && blockProfile.amenities.filter(a => a.available).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Available Amenities</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {blockProfile.amenities
                        .filter(amenity => amenity.available)
                        .map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm text-emerald-700">{amenity.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Safety Features */}
                {blockProfile.safetyFeatures && blockProfile.safetyFeatures.filter(f => f.available).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Safety Features</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {blockProfile.safetyFeatures
                        .filter(feature => feature.available)
                        .map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-blue-700">{feature.feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Block Images */}
                {blockImages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Block Gallery</h4>
                    <div className="space-y-4">
                      {blockImages.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <div className="w-full h-48 rounded-lg overflow-hidden">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{image.title}</h5>
                            {image.description && (
                              <p className="text-sm text-gray-600">{image.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}