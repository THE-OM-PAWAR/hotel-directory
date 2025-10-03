import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Space_Mono } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
  title: 'GetStay - Find Your Perfect Hostel',
  description: 'Discover comfortable and affordable hostel accommodations with GetStay. Browse rooms, explore hostels, and find your ideal living space.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${spaceMono.variable} font-poppins antialiased`}>{children}</body>
    </html>
  );
}