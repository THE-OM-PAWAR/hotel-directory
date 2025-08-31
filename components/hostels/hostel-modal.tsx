/* eslint-disable @next/next/no-img-element */
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, Phone, Mail, Building, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { useHostel } from '@/hooks/use-hostel';

interface HostelModalProps {
  hostelId: string;
  isOpen: boolean;
  onClose: () => void;
  onBlockClick: (blockId: string) => void;
}

export function HostelModal({ hostelId, isOpen, onClose, onBlockClick }: HostelModalProps) {
  const { hostel, loading } = useHostel(hostelId);

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!hostel) {
    return null;
  }

  const profile = hostel.profile;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <img
              src={profile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={hostel.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <DialogTitle className="text-2xl font-bold">{hostel.name}</DialogTitle>
              {profile?.basicInfo && (
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profile.basicInfo.city}, {profile.basicInfo.pincode}</span>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Banner Image */}
          {profile?.media?.bannerImage && (
            <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden">
              <img
                src={profile.media.bannerImage}
                alt={`${hostel.name} banner`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Basic Information */}
          {profile?.basicInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.basicInfo.contactNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.basicInfo.email}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-gray-600">
                      <p>{profile.basicInfo.address}</p>
                      {profile.basicInfo.landmark && (
                        <p className="text-sm text-gray-500">Near {profile.basicInfo.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Accommodation Type</span>
                    <Badge variant="outline">
                      {profile.propertyDetails.type}
                    </Badge>
                  </div>
                  {profile.propertyDetails.foodService.available && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Food Service</span>
                      <Badge variant="secondary">
                        {profile.propertyDetails.foodService.type || 'Available'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Facilities */}
          {profile?.propertyDetails?.facilities && profile.propertyDetails.facilities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {profile.propertyDetails.facilities
                  .filter(facility => facility.available)
                  .map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{facility.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Location Factors */}
          {profile?.locationFactors?.nearbyLandmarks && profile.locationFactors.nearbyLandmarks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Nearby Landmarks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.locationFactors.nearbyLandmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{landmark.name}</span>
                      {landmark.description && (
                        <p className="text-sm text-gray-500">{landmark.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {landmark.distance}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blocks */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Available Blocks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hostel.blocks.map((block) => (
                <Card key={block._id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onBlockClick(block._id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{block.name}</h4>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Building className="h-3 w-3" />
                        <span>{block.roomTypes.length} room types</span>
                      </div>
                      {block.profile && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3" />
                          <span>{block.profile.propertyDetails.totalRooms} rooms</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Google Maps Link */}
          {profile?.locationFactors?.googleMapLink && (
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <a 
                  href={profile.locationFactors.googleMapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Google Maps</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}