import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'Careers at GetStay - Join Our Team',
  description: 'Join GetStay and help us revolutionize the hostel booking experience. Explore current job openings and opportunities.',
};

const jobOpenings = [
  {
    id: 1,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3-5 years',
    description: "We're looking for a Full Stack Developer to help build and maintain our core platform.",
  },
  {
    id: 2,
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Hybrid',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Join our operations team to help hostel partners succeed on our platform.',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Help create beautiful and intuitive experiences for our users.',
  },
];

export default function CareersPage() {
  return (
    <PageLayout
      title="Join Our Team"
      description="Help us transform the future of hostel accommodation"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why GetStay?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Impact</h3>
            <p>Make a real difference in how people find and book their accommodations.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Growth</h3>
            <p>Continuous learning opportunities and career development support.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Culture</h3>
            <p>Work with passionate individuals in an inclusive environment.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <div key={job.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500">Experience: {job.experience}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Don't see a perfect fit?</h2>
        <p className="mb-6">
          We're always looking for talented individuals to join our team. Send your resume to{' '}
          <a href="mailto:careers@getstay.in" className="text-blue-600 hover:underline">
            careers@getstay.in
          </a>
        </p>
      </section>
    </PageLayout>
  );
}
