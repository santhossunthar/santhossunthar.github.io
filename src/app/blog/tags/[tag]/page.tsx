import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog-utils';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogPostList from '@/components/blog/BlogPostList';

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
    <div className="min-h-screen bg-black">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
        <div className="flex items-center justify-between px-4 py-3 font-cyber text-sm">
          <span className="text-white font-semibold">{matchedTag}</span>
          <div className="flex items-center gap-4">
            <Link href="/blog/tags" className="text-white/80 hover:text-white">Tags</Link>
            <Link href="/blog" className="text-white/80 hover:text-white">Posts</Link>
          </div>
        </div>
      </div>

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
