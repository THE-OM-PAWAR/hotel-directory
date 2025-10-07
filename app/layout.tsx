import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { generateOrganizationStructuredData } from '@/lib/seo/structured-data';

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
  title: 'GetStay - Best Hostels in Bhopal | PG, Rooms & Accommodation',
  description: 'Find the best hostels, PG accommodations, and rooms in Bhopal. Browse verified hostels near coaching centers with excellent amenities, Wi-Fi, food, and security. Book affordable student accommodation in Bhopal today.',
  keywords: 'hostels in Bhopal, PG in Bhopal, student accommodation Bhopal, rooms for rent Bhopal, hostel near me Bhopal, affordable hostels Bhopal, boys hostel Bhopal, girls hostel Bhopal, paying guest Bhopal, coaching hostel Bhopal',
  authors: [{ name: 'GetStay' }],
  creator: 'GetStay',
  publisher: 'GetStay',
  metadataBase: new URL('https://getstay.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'GetStay - Best Hostels in Bhopal | PG & Student Accommodation',
    description: 'Find verified hostels, PG accommodations, and rooms in Bhopal. Browse hostels near coaching centers with excellent amenities and affordable rates.',
    siteName: 'GetStay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetStay - Best Hostels in Bhopal | PG & Student Accommodation',
    description: 'Find verified hostels, PG accommodations, and rooms in Bhopal with excellent amenities and affordable rates.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationData = generateOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </head>
      <body className={`${poppins.variable} ${spaceMono.variable} font-poppins antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}