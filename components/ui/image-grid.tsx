'use client';

import { useState } from 'react';
import { ImageGallery } from './image-gallery';

interface Image {
  url: string;
  title?: string;
  description?: string;
  type?: string;
}

interface ImageGridProps {
  images: Image[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-border cursor-pointer group"
            onClick={() => {
              setSelectedImageIndex(index);
              setIsGalleryOpen(true);
            }}
          >
            <img
              src={image.url}
              alt={image.title || `Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            {image.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-sm text-white font-medium truncate">{image.title}</p>
                {image.description && (
                  <p className="text-xs text-white/70 truncate">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {isGalleryOpen && (
        <ImageGallery
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </>
  );
}
