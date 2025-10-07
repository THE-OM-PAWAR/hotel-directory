import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions - GetStay',
  description: 'Read GetStay\'s terms and conditions for using our hostel booking platform.',
};

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms and Conditions"
      description="Last updated: March 7, 2024"
    >
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using GetStay's website and services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions. If you do not agree to
            these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Definitions</h2>
          <ul>
            <li><strong>"Service"</strong> refers to the GetStay platform and website</li>
            <li><strong>"User"</strong> refers to anyone who uses our service</li>
            <li><strong>"Hostel Partner"</strong> refers to property owners and managers who list their properties</li>
            <li><strong>"Booking"</strong> refers to a confirmed reservation of accommodation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. User Accounts</h2>
          <p>To use certain features of our Service, you must:</p>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Register for an account with accurate information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>4. Booking and Payment Terms</h2>
          <h3>4.1 Bookings</h3>
          <ul>
            <li>All bookings are subject to availability</li>
            <li>Confirmation is sent after successful payment</li>
            <li>Booking details cannot be changed after confirmation</li>
          </ul>

          <h3>4.2 Payments</h3>
          <ul>
            <li>All prices are in Indian Rupees (INR)</li>
            <li>Payment must be made through our approved payment methods</li>
            <li>Booking is not confirmed until payment is processed</li>
          </ul>

          <h3>4.3 Cancellations and Refunds</h3>
          <ul>
            <li>Cancellation policies vary by property</li>
            <li>Refunds are processed according to the applicable policy</li>
            <li>Processing time for refunds may vary by payment method</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>5. User Responsibilities</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Comply with hostel rules and regulations</li>
            <li>Not engage in fraudulent activities</li>
            <li>Respect other residents and staff</li>
            <li>Maintain cleanliness and hygiene</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>6. Hostel Partner Responsibilities</h2>
          <p>Hostel Partners agree to:</p>
          <ul>
            <li>Provide accurate property information</li>
            <li>Maintain the quality of accommodations</li>
            <li>Honor confirmed bookings</li>
            <li>Comply with local laws and regulations</li>
            <li>Maintain proper licenses and permits</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>7. Intellectual Property</h2>
          <p>
            All content on the Service, including but not limited to text, graphics, logos, and
            software, is the property of GetStay and protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2>8. Limitation of Liability</h2>
          <p>
            GetStay is not liable for any indirect, incidental, special, or consequential damages
            arising from your use of the Service or any accommodations booked through our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Dispute Resolution</h2>
          <p>
            Any disputes arising from the use of our Service shall be resolved through:
          </p>
          <ul>
            <li>Direct negotiation</li>
            <li>Mediation</li>
            <li>Arbitration in Mumbai, India</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>10. Modifications to Terms</h2>
          <p>
            GetStay reserves the right to modify these terms at any time. Users will be notified of
            significant changes, and continued use of the Service constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: legal@getstay.in</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: GetStay Headquarters, Mumbai, India</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
