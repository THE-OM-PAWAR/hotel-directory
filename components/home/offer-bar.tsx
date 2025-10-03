'use client';

import { Sparkles } from 'lucide-react';

export function OfferBar() {
  return (
    <div className="bg-brand-blue text-white py-3 px-4 overflow-hidden">
      <div className="flex items-center justify-center gap-2 animate-pulse">
        <Sparkles className="w-4 h-4" />
        <p className="text-sm md:text-base font-medium font-space-mono">
          GET 20% OFF ON YOUR FIRST BOOKING | USE CODE: GETSTAY20
        </p>
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}
