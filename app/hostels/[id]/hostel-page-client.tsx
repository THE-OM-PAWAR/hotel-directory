'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PageLayout } from '@/components/layout/page-layout';
import { ArrowLeft, MapPin, Phone, Mail, Building, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { useHostel } from '@/hooks/use-hostel';
import { useState } from 'react';
import { BlockDrawer } from '@/components/blocks/block-drawer';
import { generateHostelStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/structured-data';

interface Props {
  params: { id: string };
}

export function HostelPageClient({ params }: Props) {
  const router = useRouter();
  const hostelId = params.id;
  const { hostel, loading } = useHostel(hostelId);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  if (loading) {
    return (
      <PageLayout className="bg-gray-50">
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!hostel) {
    return (
      <PageLayout className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hostel Not Found</h1>
          <p className="text-gray-600 mb-6">The hostel you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </PageLayout>
    );
  }

  const profile = hostel.profile;

  const structuredData = generateHostelStructuredData(hostel, profile);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Hostels', url: '/hostels' },
    { name: hostel.name, url: `/hostels/${hostelId}` },
  ]);

  return (
    <PageLayout className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={profile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=150'}
              alt={hostel.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
              {profile?.basicInfo && (
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{profile.basicInfo.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>{profile.basicInfo.city} - {profile.basicInfo.pincode}</span>
                  </div>
                  {profile.basicInfo.landmark && (
                    <div className="text-gray-500 text-sm">
                      Near {profile.basicInfo.landmark}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Badge variant="outline" className="text-center">
                {profile?.propertyDetails?.type || 'Mixed'} Accommodation
              </Badge>
              <div className="text-right text-sm text-gray-500">
                {hostel.blocks.length} Block{hostel.blocks.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {profile?.media?.bannerImage && (
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-sm">
            <img
              src={profile.media.bannerImage}
              alt={`${hostel.name} banner`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Blocks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hostel.blocks.map((block) => (
                  <Card key={block._id} className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setSelectedBlock(block._id)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {block.name}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{block.roomTypes.length} room types</span>
                          </div>
                          {block.profile && (
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{block.profile.propertyDetails.totalRooms} rooms</span>
                            </div>
                          )}
                        </div>

                        {block.roomTypes.length > 0 && (
                          <div>
                            <div className="text-sm text-gray-500 mb-2">Starting from:</div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-emerald-600">
                                ₹{Math.min(...block.roomTypes.map(rt => rt.rent)).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500">per month</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {profile?.propertyDetails?.facilities && profile.propertyDetails.facilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {profile.propertyDetails.facilities
                    .filter(facility => facility.available)
                    .map((facility, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-emerald-700">{facility.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {profile?.locationFactors?.nearbyLandmarks && profile.locationFactors.nearbyLandmarks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Landmarks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.locationFactors.nearbyLandmarks.map((landmark, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{landmark.name}</h4>
                        {landmark.description && (
                          <p className="text-sm text-gray-500 mt-1">{landmark.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {landmark.distance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile?.locationFactors?.coachingCenters && profile.locationFactors.coachingCenters.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Coaching Centers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.locationFactors.coachingCenters.map((center, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{center.name}</h4>
                        {center.description && (
                          <p className="text-sm text-gray-500 mt-1">{center.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {center.distance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {profile?.basicInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a
                      href={`tel:${profile.basicInfo.contactNumber}`}
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      {profile.basicInfo.contactNumber}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a
                      href={`mailto:${profile.basicInfo.email}`}
                      className="text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      {profile.basicInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {profile?.propertyDetails?.foodService?.available && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Service</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    {profile.propertyDetails.foodService.type || 'Available'}
                  </Badge>
                  {profile.propertyDetails.foodService.details && (
                    <p className="text-sm text-gray-600">
                      {profile.propertyDetails.foodService.details}
                    </p>
                  )}
                </div>
              </div>
            )}

            {profile?.locationFactors?.googleMapLink && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href={profile.locationFactors.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Google Maps</span>
                  </a>
                </Button>
              </div>
            )}

            {profile?.media?.galleryImages && profile.media.galleryImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {profile.media.galleryImages.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${hostel.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {profile.media.galleryImages.length > 4 && (
                  <div className="text-center mt-3">
                    <span className="text-sm text-gray-500">
                      +{profile.media.galleryImages.length - 4} more photos
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {profile?.rulesAndPolicies && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rules & Policies</h2>
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap text-gray-600 leading-relaxed">
                {profile.rulesAndPolicies}
              </div>
            </div>
          </div>
        )}

        {selectedBlock && (
          <BlockDrawer
            blockId={selectedBlock}
            isOpen={!!selectedBlock}
            onClose={() => setSelectedBlock(null)}
          />
        )}
      </div>
    </PageLayout>
  );
}
