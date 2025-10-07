import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'GetStay Features - Smart Hostel Booking Platform',
  description: 'Discover the powerful features that make GetStay the best platform for finding and booking hostel accommodations.',
};

const features = [
  {
    id: 1,
    title: 'Smart Search',
    description: 'Find the perfect hostel with our advanced search filters - location, price, amenities, and more.',
    icon: '🔍',
  },
  {
    id: 2,
    title: 'Virtual Tours',
    description: 'Take a virtual walk through hostels with our 360° room tours and high-quality photos.',
    icon: '🏠',
  },
  {
    id: 3,
    title: 'Instant Booking',
    description: 'Book your room instantly with our seamless booking process and secure payment system.',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from verified residents to make informed decisions.',
    icon: '⭐',
  },
  {
    id: 5,
    title: 'Price Comparison',
    description: 'Compare prices and amenities across different hostels to find the best value.',
    icon: '💰',
  },
  {
    id: 6,
    title: 'Secure Payments',
    description: 'Pay securely through our platform with multiple payment options and encryption.',
    icon: '🔒',
  },
  {
    id: 7,
    title: 'Real-time Availability',
    description: 'Check real-time room availability and get instant confirmation.',
    icon: '📅',
  },
  {
    id: 8,
    title: '24/7 Support',
    description: 'Get assistance anytime with our round-the-clock customer support team.',
    icon: '💬',
  },
];

export default function FeaturesPage() {
  return (
    <PageLayout
      title="Platform Features"
      description="Everything you need for a seamless hostel booking experience"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">For Hostel Owners</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Property Management</h3>
              <p className="text-gray-600">
                Easily manage your property listings, bookings, and resident communications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Get insights into occupancy rates, revenue, and resident satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Marketing Tools</h3>
              <p className="text-gray-600">
                Promote your property with professional photos and virtual tours.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-3">Mobile App</h3>
            <p className="text-gray-600">
              Book and manage your hostel stays on the go with our upcoming mobile app.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-3">Community Features</h3>
            <p className="text-gray-600">
              Connect with fellow residents and join hostel community events.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
