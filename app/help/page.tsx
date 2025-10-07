import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'GetStay Help Center - FAQs & Support',
  description: 'Find answers to common questions about using GetStay for hostel bookings, payments, and more.',
};

const faqs = {
  'Booking Process': [
    {
      question: 'How do I book a hostel on GetStay?',
      answer: 'Search for hostels using our search filters, select your preferred hostel, choose your room type, and complete the booking process by making the payment. You\'ll receive instant confirmation via email.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking according to the hostel\'s cancellation policy. Each hostel has its own policy, which is clearly displayed during the booking process.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets.',
    },
  ],
  'Account & Security': [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button, enter your details, verify your email address, and you\'re ready to go!',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption to protect your personal and payment information.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.',
    },
  ],
  'Hostel Policies': [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in and check-out times vary by hostel. You can find this information on each hostel\'s page.',
    },
    {
      question: 'Are meals included?',
      answer: 'Meal plans vary by hostel. Check the amenities section of each hostel listing for meal information.',
    },
    {
      question: 'What documents do I need for check-in?',
      answer: 'Generally, you\'ll need a valid government ID and your booking confirmation. Some hostels may require additional documents.',
    },
  ],
};

export default function HelpPage() {
  return (
    <PageLayout
      title="Help Center"
      description="Find answers to frequently asked questions about GetStay"
    >
      <div className="mb-8">
        <div className="p-6 bg-blue-50 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="mailto:support@getstay.in"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600">support@getstay.in</p>
              </div>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">📞</span>
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
              </div>
            </a>
          </div>
        </div>

        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <div className="space-y-4">
              {questions.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
        <p className="mb-6">
          Our support team is here to help you 24/7. Contact us anytime.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </PageLayout>
  );
}
