import { notFound } from 'next/navigation';
import { getPostByShortId, getAllPostIds, getAllPosts, BlogPost } from '@/lib/blog-utils';
import { extractTableOfContents } from '@/lib/table-of-contents';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogPostMobileNavbar from '@/components/blog/BlogPostMobileNavbar';
import BlogPostDetail from '@/components/blog/BlogPostDetail';

// SSG: Pre-generate all blog post paths at build time
export async function generateStaticParams() {
  const postIds = getAllPostIds();
  
  // Return all valid post IDs plus some common fallback routes
  const params = postIds.map((id) => ({
    id: id,
  }));
  
  // Add some common fallback routes that might be accessed
  const fallbackRoutes = [
    'some',
    'test',
    'example',
    'demo',
    '404',
    'not-found'
  ];
  
  const fallbackParams = fallbackRoutes.map((route) => ({
    id: route,
  }));
  
  return [...params, ...fallbackParams];
}


// SSG: Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostByShortId(id);
  
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

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Validate that the ID matches the expected format
  const validIds = getAllPostIds();
  if (!validIds.includes(id)) {
    notFound();
  }
  
  const post = getPostByShortId(id);

  if (!post) {
    notFound();
  }

  // Extract table of contents on the server side
  const tableOfContents = extractTableOfContents(post.content);
  
  // Get all posts for the right sidebar
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <BlogPostMobileNavbar postTitle={post.title} />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* Left Sidebar - Profile & Navigation (Desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar currentView="posts" />
          </div>

          {/* Main Content - Blog Post */}
          <div className="lg:col-span-7 px-4 border-r border-white/20">
            {/* Desktop Breadcrumb */}
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[
                { label: 'Blog', path: '/blog' },
                { label: post.title }
              ]} />
            </div>
            
            {/* Mobile content padding */}
            <div className="lg:hidden pt-16"></div>
            
            <div className="relative z-0">
              <BlogPostDetail 
                post={post}
              />
            </div>
          </div>

          {/* Right Sidebar - Tags & Recent Posts (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <BlogRightSidebar tableOfContents={tableOfContents} posts={allPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}