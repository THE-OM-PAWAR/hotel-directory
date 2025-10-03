'use client';

import { Menu, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-brand-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter">
            get<span className="text-brand-blue">stay</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search hostels..."
              className="w-full pl-10 pr-4 py-2 border-2 border-brand-black rounded-lg focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden">
            <Search className="w-6 h-6" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-lg hover:bg-brand-blue transition-colors font-medium">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
