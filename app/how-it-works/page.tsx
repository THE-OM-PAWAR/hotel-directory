import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'How GetStay Works - Simple Hostel Booking Process',
  description: 'Learn how GetStay makes hostel booking simple and efficient. Find, book, and move into your ideal hostel accommodation in just a few steps.',
};

const steps = [
  {
    number: 1,
    title: 'Search & Filter',
    description: 'Use our smart search to find hostels based on your preferences - location, budget, amenities, and more.',
    details: [
      'Enter your preferred location',
      'Set your budget range',
      'Choose required amenities',
      'Filter by room type',
    ],
  },
  {
    number: 2,
    title: 'Compare & Choose',
    description: 'Compare different hostels side by side to find the perfect match for your needs.',
    details: [
      'View high-quality photos',
      'Take virtual tours',
      'Read verified reviews',
      'Compare amenities and prices',
    ],
  },
  {
    number: 3,
    title: 'Book & Pay',
    description: 'Complete your booking securely through our platform with instant confirmation.',
    details: [
      'Select your room type',
      'Choose your move-in date',
      'Make secure payment',
      'Receive instant confirmation',
    ],
  },
  {
    number: 4,
    title: 'Move In',
    description: 'Move into your new hostel with a smooth check-in process and start enjoying your stay.',
    details: [
      'Get check-in instructions',
      'Complete document verification',
      'Meet hostel staff',
      'Start your stay',
    ],
  },
];

const forHostelOwners = [
  {
    title: 'List Your Property',
    description: 'Create a detailed listing of your hostel with photos, amenities, and pricing.',
  },
  {
    title: 'Manage Bookings',
    description: 'Accept bookings, manage occupancy, and communicate with residents through our platform.',
  },
  {
    title: 'Receive Payments',
    description: 'Get secure and timely payments directly to your bank account.',
  },
  {
    title: 'Grow Your Business',
    description: 'Access analytics and insights to optimize your occupancy and revenue.',
  },
];

export default function HowItWorksPage() {
  return (
    <PageLayout
      title="How It Works"
      description="Find and book your ideal hostel accommodation in just a few simple steps"
    >
      {/* For Students/Residents */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">For Students & Residents</h2>
        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-8">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Hostel Owners */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-8">For Hostel Owners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {forHostelOwners.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            List Your Property
          </button>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of students who have found their perfect hostel accommodation with GetStay.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search Hostels
          </button>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
