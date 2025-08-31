'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X, Search, MapPin } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OCIMUM</h1>
              <p className="text-xs text-gray-500 -mt-1">Find Your Space</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hostels, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Button>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Browse
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              List Your Hostel
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search hostels, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <a href="#" className="py-2 text-gray-600 hover:text-gray-900">Browse</a>
                <a href="#" className="py-2 text-gray-600 hover:text-gray-900">About</a>
                <a href="#" className="py-2 text-gray-600 hover:text-gray-900">Contact</a>
              </nav>
              
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                List Your Hostel
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}