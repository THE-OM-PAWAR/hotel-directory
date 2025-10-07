import React from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
}

export function PageLayout({
  children,
  className,
  title,
  description
}: PageLayoutProps) {
  return (
    <div className={cn('container mx-auto px-4 py-8 max-w-7xl', className)}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </div>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}
