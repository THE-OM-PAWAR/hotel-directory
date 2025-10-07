import { Metadata } from 'next';
import { PageLayout } from '@/components/layouts/PageLayout';

export const metadata: Metadata = {
  title: 'GetStay Blog - Latest Updates & Insights',
  description: 'Stay updated with the latest news, tips, and insights about hostel living and accommodation trends.',
};

// This would typically come from your CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Perfect Hostel',
    excerpt: 'A comprehensive guide to finding the right hostel accommodation that suits your needs and preferences.',
    date: '2024-03-07',
    readTime: '5 min read',
    category: 'Tips & Guides',
  },
  {
    id: 2,
    title: 'Top 10 Student-Friendly Areas in Major Cities',
    excerpt: 'Discover the best neighborhoods for students in popular educational hubs across the country.',
    date: '2024-03-05',
    readTime: '4 min read',
    category: 'City Guides',
  },
  {
    id: 3,
    title: 'Making the Most of Hostel Life',
    excerpt: 'Essential tips and tricks for a comfortable and enjoyable hostel living experience.',
    date: '2024-03-03',
    readTime: '6 min read',
    category: 'Lifestyle',
  },
];

export default function BlogPage() {
  return (
    <PageLayout
      title="GetStay Blog"
      description="Insights, tips, and stories about hostel living"
    >
      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="border-b pb-8 last:border-b-0">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span>{post.category}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h2 className="text-2xl font-semibold mb-3 hover:text-blue-600 cursor-pointer">
              {post.title}
            </h2>
            
            <p className="text-gray-600 mb-4">
              {post.excerpt}
            </p>
            
            <button className="text-blue-600 hover:underline">
              Read more →
            </button>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Want to stay updated with our latest posts?
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
