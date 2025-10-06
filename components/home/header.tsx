'use client';

import Link from 'next/link';
import { Menu, Search, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b-2 border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-space-mono cursor-pointer hover:scale-105 transition-transform">
              get<span className="text-brand-blue">stay</span>
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search hostels..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border-2 border-border rounded-xl focus:outline-none focus:border-brand-blue focus:bg-background transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all font-medium shadow-sm">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
