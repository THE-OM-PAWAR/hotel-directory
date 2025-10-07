import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'About GetStay - Your Trusted Hostel Booking Platform',
  description: 'Learn about GetStay\'s mission to provide comfortable and affordable hostel accommodations for students and professionals.',
};

export default function AboutPage() {
  return (
    <PageLayout
      title="About GetStay"
      description="Your trusted partner in finding the perfect hostel accommodation"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At GetStay, we're committed to revolutionizing the way students and professionals find and book hostel accommodations. 
          Our platform connects quality hostel providers with those seeking comfortable, affordable, and reliable living spaces.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose GetStay?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Verified Hostels</h3>
            <p>Every hostel on our platform is thoroughly verified to ensure quality and safety standards.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Easy Booking</h3>
            <p>Our streamlined booking process makes it simple to find and secure your ideal accommodation.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">24/7 Support</h3>
            <p>Our dedicated support team is always available to assist you with any queries or concerns.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Best Prices</h3>
            <p>We work with hostel partners to ensure competitive pricing and great value for our users.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Trust:</strong> Building trust through transparency and reliability</li>
          <li><strong>Quality:</strong> Maintaining high standards in all our listed accommodations</li>
          <li><strong>Affordability:</strong> Making quality housing accessible to everyone</li>
          <li><strong>Community:</strong> Creating a supportive environment for our users</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you. Visit our{' '}
          <a href="/contact" className="text-blue-600 hover:underline">contact page</a>{' '}
          or email us at support@getstay.in
        </p>
      </section>
    </PageLayout>
  );
}
