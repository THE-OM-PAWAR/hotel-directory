'use client';

import { Check, Shield, Map, Building2, Calendar, Chrome as Home, MapPin } from 'lucide-react';
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
      <div className="space-y-6">


        {/* Block Information - Compact Grid */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold">Block Information</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <Building2 className="w-5 h-5 text-brand-blue mx-auto mb-1" />
                <div className="text-lg font-bold">{block.propertyDetails.totalFloors}</div>
                <div className="text-xs text-muted-foreground">Floors</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <Home className="w-5 h-5 text-brand-blue mx-auto mb-1" />
                <div className="text-lg font-bold">{block.propertyDetails.totalRooms}</div>
                <div className="text-xs text-muted-foreground">Rooms</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <Calendar className="w-5 h-5 text-brand-blue mx-auto mb-1" />
                <div className="text-lg font-bold">{block.propertyDetails.establishedYear}</div>
                <div className="text-xs text-muted-foreground">Established</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <Building2 className="w-5 h-5 text-brand-blue mx-auto mb-1" />
                <div className="text-lg font-bold capitalize">{block.propertyDetails.buildingType}</div>
                <div className="text-xs text-muted-foreground">Type</div>
              </div>
            </div>

            {/* Description */}
            {block.basicInfo.description && (
              <div className="bg-secondary/20 rounded-lg p-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {block.basicInfo.description}
                </p>
              </div>
            )}

            {/* Accommodation Type */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Accommodation:</span>
              <span className="font-medium capitalize">{block.propertyDetails.accommodationType}</span>
            </div>

            {/* Landmark */}
            {block.basicInfo.landmark && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Landmark: </span>
                  <span className="text-muted-foreground">{block.basicInfo.landmark}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amenities & Safety - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Amenities */}
          {availableAmenities.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold">Amenities</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  {availableAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span className="text-muted-foreground">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Safety Features */}
          {availableSafetyFeatures.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold">Safety</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  {availableSafetyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span className="text-muted-foreground">{feature.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
                {/* Image Gallery */}
                {block.media.photos.length > 0 && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold">Gallery</h2>
            </div>
            <div className="p-4">
              <ImageGrid images={block.media.photos.map(photo => ({
                url: photo.url,
                title: photo.title,
                description: photo.description || '',
                type: photo.type
              }))} />
            </div>
          </div>
        )}

        {/* Location Information */}
        {block.locationInfo.googleMapLink && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold">Location</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <Link
                  href={block.locationInfo.googleMapLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2 p-3 bg-brand-blue/10 text-brand-blue rounded-lg border border-brand-blue/20 hover:bg-brand-blue/20 transition-all text-sm font-medium"
                >
                  <Map className="w-4 h-4" />
                  <span>View on Google Maps</span>
                </Link>

                {/* Landmarks and Transport in Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {block.locationInfo.nearbyLandmarks.length > 0 && (
                    <div className="bg-secondary/20 rounded-lg p-3">
                      <h3 className="text-sm font-bold mb-2">Nearby Landmarks</h3>
                      <ul className="space-y-1">
                        {block.locationInfo.nearbyLandmarks.map((landmark, index) => (
                          <li key={landmark._id || index} className="text-sm text-muted-foreground flex items-baseline gap-1">
                            <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0 mt-1.5"></span>
                            <span>
                              {landmark.name}
                              {landmark.distance && (
                                <span className="text-xs opacity-70 ml-1">({landmark.distance})</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {block.locationInfo.transportConnectivity.length > 0 && (
                    <div className="bg-secondary/20 rounded-lg p-3">
                      <h3 className="text-sm font-bold mb-2">Transport</h3>
                      <ul className="space-y-1">
                        {block.locationInfo.transportConnectivity.map((transport, index) => (
                          <li key={transport._id || index} className="text-sm text-muted-foreground flex items-baseline gap-1">
                            <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0 mt-1.5"></span>
                            <span>
                              {transport.name}
                              {transport.distance && (
                                <span className="text-xs opacity-70 ml-1">({transport.distance})</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
