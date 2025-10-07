import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy - GetStay',
  description: 'Learn about how GetStay collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      description="Last updated: March 7, 2024"
    >
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2>Introduction</h2>
          <p>
            At GetStay, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our website and services.
            Please read this privacy policy carefully. By using our service, you agree to the
            collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Date of birth</li>
            <li>Government-issued ID details</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
            <li>Profile information</li>
          </ul>

          <h3>Usage Information</h3>
          <p>We automatically collect certain information about your device, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Access times</li>
            <li>Pages viewed</li>
            <li>Links clicked</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your bookings and payments</li>
            <li>Verify your identity</li>
            <li>Communicate with you about your bookings</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our services</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Hostel partners (to facilitate your booking)</li>
            <li>Payment processors</li>
            <li>Service providers</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information, including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Employee training on data protection</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and
            hold certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for use by children under the age of 18. We do not knowingly
            collect personal information from children under 18.
          </p>
        </section>

        <section className="mb-8">
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@getstay.in</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: GetStay Headquarters, Mumbai, India</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
