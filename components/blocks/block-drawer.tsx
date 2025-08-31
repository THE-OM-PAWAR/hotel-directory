'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageSlider } from '@/components/ui/image-slider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, Building, Users, Calendar, Shield } from 'lucide-react';
import { useBlock } from '@/hooks/use-block';

interface BlockDrawerProps {
  blockId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BlockDrawer({ blockId, isOpen, onClose }: BlockDrawerProps) {
  const { block, loading } = useBlock(blockId);

  if (loading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!block) {
    return null;
  }

  const images = block.media?.photos?.map(photo => ({
    url: photo.url,
    title: photo.title
  })) || [];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{block.basicInfo.name}</SheetTitle>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{block.basicInfo.city}, {block.basicInfo.state}</span>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Images */}
          {images.length > 0 && (
            <div className="w-full h-48 md:h-64">
              <ImageSlider images={images} />
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About This Block</h3>
                <p className="text-gray-600 leading-relaxed">
                  {block.basicInfo.description || 'No description available'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{block.basicInfo.address}</span>
                  </div>
                  {block.basicInfo.landmark && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Near {block.basicInfo.landmark}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{block.basicInfo.contactNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Floors</span>
                    <span className="font-medium">{block.propertyDetails.totalFloors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Rooms</span>
                    <span className="font-medium">{block.propertyDetails.totalRooms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Accommodation</span>
                    <Badge variant="outline">
                      {block.propertyDetails.accommodationType}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Building Type</span>
                    <Badge variant="secondary">
                      {block.propertyDetails.buildingType}
                    </Badge>
                  </div>
                  {block.propertyDetails.establishedYear && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-medium">{block.propertyDetails.establishedYear}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          {block.amenities && block.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {block.amenities.map((amenity, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      amenity.available ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      amenity.available ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}></div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Features */}
          {block.safetyFeatures && block.safetyFeatures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Safety Features</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {block.safetyFeatures
                  .filter(feature => feature.available)
                  .map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="text-sm font-medium text-blue-900">{feature.feature}</span>
                        {feature.details && (
                          <p className="text-xs text-blue-700 mt-1">{feature.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Location Information */}
          {block.locationInfo && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Location & Connectivity</h3>
              
              {/* Nearby Landmarks */}
              {block.locationInfo.nearbyLandmarks && block.locationInfo.nearbyLandmarks.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Nearby Landmarks</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {block.locationInfo.nearbyLandmarks.map((landmark, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{landmark.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {landmark.distance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transport Connectivity */}
              {block.locationInfo.transportConnectivity && block.locationInfo.transportConnectivity.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Transport Connectivity</h4>
                  <div className="space-y-2">
                    {block.locationInfo.transportConnectivity.map((transport, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs">
                            {transport.mode.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium">{transport.distance}</span>
                        </div>
                        <p className="text-sm text-gray-600">{transport.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}