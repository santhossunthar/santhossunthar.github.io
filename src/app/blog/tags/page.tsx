import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-utils';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import TagsView from '@/components/blog/TagsView';

export async function generateMetadata() {
  return {
    title: 'Blog Tags | Santhos Suntharalingam',
    description: 'Browse blog posts by tags and categories',
  };
}

export default function BlogTagsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
        <div className="flex items-center justify-between px-4 py-3 font-cyber text-sm">
          <span className="text-white font-semibold">Tags</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-white/80 hover:text-white">Posts</Link>
            <Link href="/" className="text-white/80 hover:text-white">Portfolio</Link>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar currentView="tags" />
          </div>

          <div className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Tags' }]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <div className="relative z-0">
              <TagsView posts={posts} />
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col sticky top-0 h-screen">
            <BlogRightSidebar posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
