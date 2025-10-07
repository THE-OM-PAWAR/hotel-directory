import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'GetStay Pricing - Transparent Hostel Booking Fees',
  description: 'View our transparent pricing structure for hostel bookings and property listings. No hidden fees, just clear and simple pricing.',
};

const pricingPlans = [
  {
    name: 'Basic',
    price: '0',
    description: 'Perfect for students looking for their ideal hostel',
    features: [
      'Search and filter hostels',
      'View hostel details and photos',
      'Read verified reviews',
      'Basic booking support',
      'Email notifications',
    ],
    recommended: false,
    buttonText: 'Get Started',
  },
  {
    name: 'Premium',
    price: '499',
    description: 'Enhanced features for a better booking experience',
    features: [
      'All Basic features',
      'Priority booking',
      'Virtual hostel tours',
      '24/7 premium support',
      'Flexible cancellation',
      'Exclusive hostel deals',
      'Room customization options',
    ],
    recommended: true,
    buttonText: 'Try Premium',
  },
  {
    name: 'Business',
    price: '1999',
    description: 'For hostel owners and property managers',
    features: [
      'Multiple property listings',
      'Advanced analytics dashboard',
      'Booking management system',
      'Direct messaging with residents',
      'Marketing tools',
      'Priority support',
      'Custom branding options',
    ],
    recommended: false,
    buttonText: 'Contact Sales',
  },
];

const additionalFeatures = [
  {
    title: 'Booking Protection',
    price: '299',
    description: 'Get coverage for cancellations, property damage, and more.',
  },
  {
    title: 'Moving Assistance',
    price: '799',
    description: 'Professional help with moving your belongings to the hostel.',
  },
  {
    title: 'Document Verification',
    price: '199',
    description: 'Fast-track your document verification process.',
  },
];

export default function PricingPage() {
  return (
    <PageLayout
      title="Transparent Pricing"
      description="Choose the plan that works best for you"
    >
      {/* Main Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 ${
              plan.recommended
                ? 'border-blue-600 shadow-lg relative'
                : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  Recommended
                </span>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                {plan.price !== '0' && (
                  <span className="text-gray-600">/month</span>
                )}
              </div>
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-lg transition-colors ${
                plan.recommended
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Additional Services */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Additional Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <div className="text-2xl font-bold mb-3">₹{feature.price}</div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button className="text-blue-600 hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Can I change plans later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Are there any hidden fees?</h3>
            <p className="text-gray-600">
              No, we believe in complete transparency. All fees are clearly displayed before booking.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods are accepted?</h3>
            <p className="text-gray-600">
              We accept all major credit/debit cards, UPI, net banking, and popular digital wallets.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-gray-600">
              Yes, refunds are processed according to our refund policy and the plan's terms and conditions.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
