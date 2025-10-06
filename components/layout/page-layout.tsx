'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/layout/footer';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = ''
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && <Header />}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
