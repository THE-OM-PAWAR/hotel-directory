'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Find Your Perfect Stay',
    subtitle: 'Premium hostels at best prices',
    image: '/banners/BANNER1.png'
  },
  // {
  //   id: 2,
  //   title: 'Live Comfortably',
  //   subtitle: 'Modern amenities & facilities',
  //   image: '/banners/BANNER2.jpg'
  // },
  // {
  //   id: 3,
  //   title: 'Book Instantly',
  //   subtitle: 'Quick & easy reservations',
  //   image: '/banners/BANNER3.jpg'
  // }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative max-w-7xl mx-auto aspect-[2/1] w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700   ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full w-full ">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-contain"
            />
            {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-3xl font-light text-white/90">
                  {banner.subtitle}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      ))}

      {/* <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button> */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
