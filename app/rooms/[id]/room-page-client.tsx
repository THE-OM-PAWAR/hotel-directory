'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/page-layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { ImageGallery } from '@/components/ui/image-gallery';
import { ArrowLeft, MapPin, Users, Wifi, Car, Heart, Building2, Chrome as Home, ChevronLeft, ChevronRight, Eye, Phone, Check, Shield, Map } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export function RoomPageClient({ params }: Props) {
  const router = useRouter();
  const [room, setRoom] = useState<any>(null);
  const [relatedRooms, setRelatedRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showAllComponents, setShowAllComponents] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    async function fetchRoomData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/rooms?page=1&limit=100`);
        const data = await response.json();

        const foundRoom = data.rooms?.find((r: any) => r._id === params.id);
        if (foundRoom) {
          setRoom(foundRoom);

          const related = data.rooms
            ?.filter((r: any) => r._id !== params.id && r.block._id === foundRoom.block._id)
            ?.slice(0, 4);
          setRelatedRooms(related || []);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchRoomData();
    }
  }, [params.id]);

  useEffect(() => {
    if (room) {
      const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
      setIsSaved(savedRooms.some((savedRoom: any) => savedRoom?._id === room?._id));
    }
  }, [room]);

  const toggleSave = () => {
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    if (isSaved) {
      const updated = savedRooms.filter((r: any) => r._id !== room._id);
      localStorage.setItem('savedRooms', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedRooms.push(room);
      localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
      setIsSaved(true);
    }
  };

  const nextImage = () => {
    if (room?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!room) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Room Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested room could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
          >
            Back to Home
          </button>
        </div>
      </PageLayout>
    );
  }

  const images = room.images || [];
  const hostelProfile = room.hostel?.profile;
  const blockProfile = room.block?.profile;

  return (
    <PageLayout>
      {showGallery && (
        <ImageGallery
          images={images}
          initialIndex={currentImageIndex}
          onClose={() => setShowGallery(false)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="space-y-6 lg:col-span-5">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border-2 border-border shadow-xl bg-secondary/30">
              {images.length > 0 ? (
                <div
                  className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    const index = Math.round(container.scrollLeft / container.offsetWidth);
                    setCurrentImageIndex(index);
                  }}
                >
                  {images.map((image: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => setShowGallery(true)}
                      className="w-full h-full flex-none snap-center cursor-pointer"
                    >
                      <img
                        src={image.url}
                        alt={`${room.name} - Image ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Home className="w-20 h-20 text-muted-foreground/30" />
                </div>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_: any, index: number) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-8 bg-brand-blue'
                          : 'w-2 bg-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
                  <p className="text-2xl text-brand-blue font-bold font-space-mono">
                    ₹{room.rent?.toLocaleString()}/month
                  </p>
                </div>
                <button
                  onClick={toggleSave}
                  className="p-3 rounded-xl border-2 border-border bg-secondary/50 hover:bg-secondary transition-all hover:scale-110 active:scale-95"
                >
                  <Heart className={`w-6 h-6 ${isSaved ? 'fill-brand-blue text-brand-blue' : 'text-foreground'}`} />
                </button>
              </div>

              {room.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>
                </div>
              )}

              {room.components && room.components.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Room Components</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(showAllComponents ? room.components : room.components.slice(0, 6)).map((comp: any) => (
                      <Badge key={comp._id} variant="secondary" className="px-3 py-1 text-sm border-2 border-border">
                        {comp.name}
                      </Badge>
                    ))}
                  </div>
                  {room.components.length > 6 && (
                    <button
                      onClick={() => setShowAllComponents(!showAllComponents)}
                      className="flex items-center gap-2 text-brand-blue hover:text-brand-blue/80 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      {showAllComponents ? 'Show Less' : `View More (${room.components.length - 6} more)`}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Hostel Details</h2>
                  <Link href={`/blocks/${room.block._id}`} className="text-brand-blue hover:underline text-sm">
                    View Full Details
                  </Link>
                </div>
                {blockProfile?.basicInfo && (
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{blockProfile.basicInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{blockProfile.basicInfo.address}, {blockProfile.basicInfo.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{blockProfile.basicInfo.contactNumber}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {blockProfile?.propertyDetails && (
                    <div className="bg-secondary/30 rounded-xl p-4 border-2 border-border">
                      <h3 className="text-sm font-bold mb-3">Property Information</h3>
                      <p className="text-sm text-muted-foreground">
                        This property has <span className="font-medium text-foreground">{blockProfile.propertyDetails.totalFloors}</span> floor{blockProfile.propertyDetails.totalFloors > 1 ? 's' : ''} and <span className="font-medium text-foreground">{blockProfile.propertyDetails.totalRooms}</span> room{blockProfile.propertyDetails.totalRooms > 1 ? 's' : ''}. It is a <span className="font-medium capitalize text-foreground">{blockProfile.propertyDetails.accommodationType}</span> type accommodation in a <span className="font-medium capitalize text-foreground">{blockProfile.propertyDetails.buildingType}</span> building.
                      </p>
                    </div>
                  )}

                  {blockProfile?.amenities && (
                    <div className="bg-secondary/30 rounded-xl p-4 border-2 border-border">
                      <h3 className="text-sm font-bold mb-3">Available Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {blockProfile.amenities
                          .filter((amenity: any) => amenity.available)
                          .map((amenity: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
                              <Check className="w-4 h-4 text-brand-blue" />
                              <span className="text-sm text-muted-foreground">{amenity.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {blockProfile?.safetyFeatures && (
                    <div className="bg-secondary/30 rounded-xl p-4 border-2 border-border">
                      <h3 className="text-sm font-bold mb-3">Safety Features</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {blockProfile.safetyFeatures
                          .filter((feature: any) => feature.available)
                          .map((feature: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
                              <Shield className="w-4 h-4 text-brand-blue" />
                              <span className="text-sm text-muted-foreground">{feature.feature}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {blockProfile?.locationInfo?.googleMapLink && (
                    <Link
                      href={blockProfile.locationInfo.googleMapLink}
                      target="_blank"
                      className="flex items-center justify-center gap-2 p-3 bg-brand-blue/10 text-brand-blue rounded-xl border-2 border-brand-blue/20 hover:bg-brand-blue/20 transition-colors"
                    >
                      <Map className="w-4 h-4" />
                      <span className="text-sm font-medium">View on Google Maps</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {relatedRooms.length > 0 && (
          <div className="mt-12 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6">
              More from <span className="text-brand-blue">{room.block.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRooms.map((relatedRoom) => (
                <Link key={relatedRoom._id} href={`/rooms/${relatedRoom._id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-border bg-secondary/30 mb-3">
                      <img
                        src={relatedRoom.images?.[0]?.url || 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={relatedRoom.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-brand-blue text-white border-2 border-border font-bold">
                          ₹{relatedRoom.rent?.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-brand-blue transition-colors">
                      {relatedRoom.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {relatedRoom.description || 'No description available'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
