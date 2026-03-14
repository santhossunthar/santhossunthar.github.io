import { getAllPosts } from '@/lib/blog-utils';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogMobileMenu from '@/components/blog/BlogMobileMenu';

export async function generateMetadata() {
  return {
    title: 'Blog - Santhos Suntharalingam',
    description: 'Security and development blog posts',
  };
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-page min-h-screen bg-black">
      <BlogMobileMenu title="Blog Posts" currentView="posts" />

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar currentView="posts" />
          </div>

          <div className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[{ label: 'Blog' }]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <div className="relative z-0">
              <BlogPostList posts={posts} title="Blog Posts" />
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
