'use client';

import { useEffect, useState } from 'react';
import { X, IndianRupee, Package, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomDrawerProps {
  room: {
    _id: string;
    name: string;
    description: string;
    rent: number;
    components: Array<{
      _id: string;
      name: string;
      description: string;
    }>;
    images?: Array<{
      url: string;
      title: string;
      isCover?: boolean;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function RoomDrawer({ room, isOpen, onClose }: RoomDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    if (room.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images!.length);
    }
  };

  const prevImage = () => {
    if (room.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images!.length) % room.images!.length);
    }
  };

  if (!isOpen) return null;

  const content = (
    <div className={`bg-white ${isMobile ? 'rounded-t-3xl' : 'rounded-2xl border-4 border-brand-black'} overflow-hidden flex flex-col ${isMobile ? 'h-[90vh]' : 'max-h-[90vh] w-full max-w-2xl'}`}>
      <div className="flex items-center justify-between p-4 border-b-2 border-brand-black">
        <h2 className="text-2xl font-extrabold">{room.name}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-brand-gray rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {room.images && room.images.length > 0 && (
          <div className="relative aspect-[16/9] bg-brand-gray">
            <img
              src={room.images[currentImageIndex].url}
              alt={room.images[currentImageIndex].title}
              className="w-full h-full object-cover"
            />

            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-6 h-6 text-brand-blue" />
              <span className="text-3xl font-extrabold">{room.rent.toLocaleString()}</span>
              <span className="text-sm font-light text-gray-500">/month</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-600 font-light leading-relaxed">{room.description}</p>
          </div>

          {room.components && room.components.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold">Room Components</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.components.map((component) => (
                  <div
                    key={component._id}
                    className="p-4 bg-brand-gray rounded-lg border-2 border-brand-black"
                  >
                    <h4 className="font-bold mb-1">{component.name}</h4>
                    <p className="text-sm font-light text-gray-600">{component.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t-2 border-brand-black">
        <button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-black transition-colors border-2 border-brand-black">
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-brand-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {isMobile ? (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
          {content}
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {content}
        </div>
      )}
    </>
  );
}
