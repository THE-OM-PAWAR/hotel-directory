'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
interface ImageSliderProps {
  images: Array<{
    url: string;
    title: string;
  }>;
  className?: string;
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={cn("relative w-full h-full bg-gray-100 rounded-lg overflow-hidden", className)}>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].title}
        className="w-full h-full object-contain"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}