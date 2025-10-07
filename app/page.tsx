import { Metadata } from 'next';
import { HomePageClient } from './page-client';

export const metadata: Metadata = {
  title: 'GetStay - Best Hostels in Bhopal | PG, Rooms & Student Accommodation',
  description: 'Find the best hostels, PG accommodations, and rooms in Bhopal. Browse verified hostels near coaching centers, colleges, and institutes. Affordable student accommodation with Wi-Fi, food, and security.',
  keywords: 'hostels in Bhopal, PG in Bhopal, student accommodation Bhopal, rooms for rent Bhopal, hostel near me Bhopal, affordable hostels Bhopal, boys hostel Bhopal, girls hostel Bhopal, paying guest Bhopal, coaching hostel Bhopal, hostel near coaching center Bhopal',
};

export default function Home() {
  return <HomePageClient />;
}
