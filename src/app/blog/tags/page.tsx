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
  
  return <BlogPageClient posts={posts} initialView="tags" />;
}
