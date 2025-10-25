import { Suspense } from 'react';
import { getAllPosts, BlogPost } from '@/lib/blog-utils';
import BlogPageClient from './BlogPageClient';

// SSG: Pre-generate all blog data at build time
export async function generateMetadata() {
  return {
    title: 'Blog - Santhos Suntharalingam',
    description: 'Security and development blog posts',
  };
}

export default function BlogPage() {
  // Pre-fetch all posts at build time
  const posts: BlogPost[] = getAllPosts();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>}>
      <BlogPageClient posts={posts} />
    </Suspense>
  );
}