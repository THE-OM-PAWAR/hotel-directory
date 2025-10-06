'use client';

import { Sparkles } from 'lucide-react';

export function OfferBar() {
  return (
    <div className="bg-brand-blue text-white py-2.5 px-4 overflow-hidden border-b-2 border-border">
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <p className="text-sm md:text-base font-medium font-space-mono">
          GET 20% OFF ON YOUR FIRST BOOKING | USE CODE: GETSTAY20
        </p>
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
}
