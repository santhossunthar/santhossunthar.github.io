import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog-utils';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogMobileMenu from '@/components/blog/BlogMobileMenu';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: slugifyTag(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const tags = getAllTags();
  const matchedTag = tags.find((item) => slugifyTag(item) === tag);

  if (!matchedTag) {
    return {
      title: 'Tag Not Found | Santhos Suntharalingam',
    };
  }

  return {
    title: `${matchedTag} Posts | Santhos Suntharalingam`,
    description: `Browse blog posts tagged with ${matchedTag}`,
  };
}

export default async function BlogTagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getAllPosts();
  const tags = getAllTags();
  const matchedTag = tags.find((item) => slugifyTag(item) === tag);

  if (!matchedTag) {
    notFound();
  }

  const filteredPosts = posts.filter((post) =>
    post.tags.some((postTag) => slugifyTag(postTag) === tag)
  );

  return (
    <div className="blog-page min-h-screen bg-black">
      <BlogMobileMenu title={matchedTag} currentView="posts" />

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar currentView="posts" />
          </div>

          <div className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Tags', path: '/blog/tags' }, { label: matchedTag }]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <div className="relative z-0">
              <BlogPostList posts={filteredPosts} title={`${matchedTag} Posts`} />
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
