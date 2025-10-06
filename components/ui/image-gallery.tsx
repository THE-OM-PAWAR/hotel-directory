'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: { url: string }[];
  initialIndex?: number;
  onClose: () => void;
}

export function ImageGallery({ images, initialIndex = 0, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="absolute top-4 right-4 z-[60]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div 
        className="w-full h-full max-w-7xl max-h-screen p-4" 
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            <div 
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              onScroll={(e) => {
                const container = e.currentTarget;
                const index = Math.round(container.scrollLeft / container.offsetWidth);
                setCurrentIndex(index);
              }}
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="w-full h-full flex-none snap-center flex items-center justify-center"
                >
                  <img
                    src={image.url}
                    alt={`Gallery image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
            
            {images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-brand-blue'
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-white text-center">No images available</div>
        )}
      </div>
    </div>
  );
}
