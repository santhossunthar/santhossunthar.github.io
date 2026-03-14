import Link from 'next/link';
import { BlogPost } from '@/lib/blog-utils';

interface BlogPostListProps {
  posts: BlogPost[];
  title?: string;
}

export default function BlogPostList({ posts, title = 'Blog Posts' }: BlogPostListProps) {
  return (
    <div className="space-y-6 font-cyber">
      <div className="hidden lg:flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <div className="text-white/70 text-sm">{posts.length} posts</div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.shortId}`} className="block">
            <article className="bg-black border border-white/20 rounded-lg p-4 md:p-6 hover:bg-white/5 hover:border-white/40 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {post.featured && (
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">Featured</span>
                  )}
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">{post.category}</span>
                </div>
                <span className="text-white/60 text-sm">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 transition-colors duration-300">{post.title}</h2>

              <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-white/60 text-sm">{post.date}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
