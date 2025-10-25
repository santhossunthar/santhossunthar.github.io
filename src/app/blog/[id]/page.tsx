import { notFound } from 'next/navigation';
import { getPostData, getAllPosts } from '@/lib/blog-utils';
import BlogPostDetail from '@/components/blog/BlogPostDetail';

// SSG: Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// SSG: Generate metadata for each post
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = getPostData(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Santhos Suntharalingam`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getPostData(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogPostDetail 
          postId={post.id}
          onBack={() => {
            // Use Next.js router for proper navigation
            if (typeof window !== 'undefined') {
              window.history.back();
            }
          }}
        />
      </div>
    </div>
  );
}
