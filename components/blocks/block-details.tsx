'use client';

import { Check, Shield, Map } from 'lucide-react';
import { ImageGrid } from '@/components/ui/image-grid';
import Link from 'next/link';

interface BlockDetailsProps {
  block: {
    basicInfo: {
      name: string;
      description: string;
      address: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
    };
    propertyDetails: {
      totalFloors: number;
      totalRooms: number;
      accommodationType: string;
      establishedYear: number;
      buildingType: string;
    };
    locationInfo: {
      googleMapLink: string;
      nearbyLandmarks: Array<{
        name: string;
        distance?: string;
        type?: string;
        _id?: string;
      }>;
      transportConnectivity: Array<{
        name: string;
        distance?: string;
        type?: string;
        _id?: string;
      }>;
    };
    media: {
      photos: Array<{
        url: string;
        title: string;
        description: string;
        type: string;
        isMain: boolean;
      }>;
      virtualTourLink: string;
    };
    amenities: Array<{
      name: string;
      available: boolean;
      description: string;
      floor: string;
    }>;
    safetyFeatures: Array<{
      feature: string;
      available: boolean;
      details: string;
    }>;
  };
}

export function BlockDetails({ block }: BlockDetailsProps) {
  const availableAmenities = block.amenities.filter(amenity => amenity.available);
  const availableSafetyFeatures = block.safetyFeatures.filter(feature => feature.available);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Image Gallery */}
        {block.media.photos.length > 0 && (
          <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h2 className="text-xl font-bold">Photos</h2>
            </div>
            <div className="p-6">
              <ImageGrid images={block.media.photos.map(photo => ({
                url: photo.url,
                title: photo.title,
                description: photo.description || '',
                type: photo.type
              }))} />
            </div>
          </div>
        )}

        {/* Property Details */}
        <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <h2 className="text-xl font-bold">Property Information</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              This property has <span className="font-medium text-foreground">{block.propertyDetails.totalFloors}</span> floor{block.propertyDetails.totalFloors > 1 ? 's' : ''} and <span className="font-medium text-foreground">{block.propertyDetails.totalRooms}</span> room{block.propertyDetails.totalRooms > 1 ? 's' : ''}. It is a <span className="font-medium capitalize text-foreground">{block.propertyDetails.accommodationType}</span> type accommodation in a <span className="font-medium capitalize text-foreground">{block.propertyDetails.buildingType}</span> building, established in <span className="font-medium text-foreground">{block.propertyDetails.establishedYear}</span>.
            </p>

            {block.basicInfo.description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {block.basicInfo.description}
              </p>
            )}

            {block.basicInfo.landmark && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Landmark</p>
                <p className="text-sm text-muted-foreground">{block.basicInfo.landmark}</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Amenities */}
        {availableAmenities.length > 0 && (
          <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h2 className="text-xl font-bold">Available Amenities</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-xl">
                    <Check className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm text-muted-foreground">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Safety Features */}
        {availableSafetyFeatures.length > 0 && (
          <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h2 className="text-xl font-bold">Safety Features</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSafetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-xl">
                    <Shield className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm text-muted-foreground">{feature.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Information */}
        {block.locationInfo.googleMapLink && (
          <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h2 className="text-xl font-bold">Location</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link 
                  href={block.locationInfo.googleMapLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2 p-3 bg-brand-blue/10 text-brand-blue rounded-xl border-2 border-brand-blue/20 hover:bg-brand-blue/20 transition-colors"
                >
                  <Map className="w-4 h-4" />
                  <span className="text-sm font-medium">View on Google Maps</span>
                </Link>

                {block.locationInfo.nearbyLandmarks.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold mb-2">Nearby Landmarks</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {block.locationInfo.nearbyLandmarks.map((landmark, index) => (
                        <li key={landmark._id || index} className="text-sm text-muted-foreground">
                          {landmark.name}
                          {landmark.distance && (
                            <span className="text-xs text-muted-foreground/70 ml-2">
                              ({landmark.distance})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {block.locationInfo.transportConnectivity.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold mb-2">Transport Connectivity</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {block.locationInfo.transportConnectivity.map((transport, index) => (
                        <li key={transport._id || index} className="text-sm text-muted-foreground">
                          {transport.name}
                          {transport.distance && (
                            <span className="text-xs text-muted-foreground/70 ml-2">
                              ({transport.distance})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
