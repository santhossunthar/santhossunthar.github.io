import { Suspense } from 'react';
import { getAllPosts } from '@/lib/blog-utils';
import BlogPageClient from '../BlogPageClient';

export async function generateMetadata() {
  return {
    title: 'Blog Tags | Santhos Suntharalingam',
    description: 'Browse blog posts by tags and categories',
  };
}

export default function BlogTagsPage() {
  const posts = getAllPosts();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    }>
      <BlogPageClient posts={posts} initialView="tags" />
    </Suspense>
  );
}
