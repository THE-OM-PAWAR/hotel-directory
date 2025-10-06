'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/home/header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { ImageGallery } from '@/components/ui/image-gallery';
import { ArrowLeft, MapPin, Users, Wifi, Car, Heart, Building2, Chrome as Home, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

export default function RoomDetailPage() {
  const params = useParams();
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
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
      </div>
    );
  }

  const images = room.images || [];
  const hostelProfile = room.hostel?.profile;
  const blockProfile = room.block?.profile;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {showGallery && (
        <ImageGallery 
          images={images} 
          initialIndex={currentImageIndex} 
          onClose={() => setShowGallery(false)} 
        />
      )}

      {/* <button
        onClick={() => router.back()}
        className="fixed top-20 left-4 z-40 bg-background/80 backdrop-blur-sm p-3 rounded-xl border-2 border-border shadow-lg hover:bg-background transition-all hover:scale-110 active:scale-95"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button> */}

      <main className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Image Section (smaller) */}
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

          {/* Right Side - Room Details Section (larger) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Room Header */}
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

            {/* Location Details */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Location Details</h2>

              <Link href={`/hostels/${room.hostel._id}`}>
                <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-xl border-2 border-border hover:border-brand-blue transition-all cursor-pointer mb-4">
                  <img
                    src={hostelProfile?.media?.profileImage || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={room.hostel.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Hostel</p>
                    <p className="text-sm text-muted-foreground truncate">{room.hostel.name}</p>
                  </div>
                </div>
              </Link>

              <Link href={`/blocks/${room.block._id}`}>
                <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-xl border-2 border-border hover:border-brand-blue transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center border-2 border-border">
                    <Building2 className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Block</p>
                    <p className="text-sm text-muted-foreground truncate">{room.block.name}</p>
                  </div>
                </div>
              </Link>

              {hostelProfile?.basicInfo?.city && (
                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{hostelProfile.basicInfo.city}</span>
                </div>
              )}

              {blockProfile?.amenities && blockProfile.amenities.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold mb-3">Amenities</h3>
                  <div className="space-y-2">
                    {blockProfile.amenities.slice(0, 5).map((amenity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{amenity.name}</span>
                        <Badge variant={amenity.available ? "default" : "secondary"} className="text-xs">
                          {amenity.available ? 'Available' : 'Not Available'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    </div>
  );
}
