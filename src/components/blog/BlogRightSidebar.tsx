import Link from 'next/link';
import { BlogPost, slugifyTag } from '@/lib/blog-utils';
import { TableOfContentsItem } from '@/lib/table-of-contents';
import TableOfContents from './TableOfContents';

interface BlogRightSidebarProps {
  tableOfContents?: TableOfContentsItem[];
  posts?: BlogPost[];
}

export default function BlogRightSidebar({ tableOfContents, posts = [] }: BlogRightSidebarProps) {
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b));

  const topPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((post) => ({
      id: post.id,
      shortId: post.shortId,
      title: post.title,
    }));

  return (
    <div>
      <div className="bg-black font-cyber">
        <div className="p-4">
          <h3 className="text-base font-bold text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tags/${slugifyTag(tag)}`}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full text-white/80 hover:text-white text-xs transition-all duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/20">
          <h3 className="text-base font-bold text-white mb-3">Recent Posts</h3>
          <div className="space-y-2">
            {topPosts.map((post, index) => (
              <div key={post.id} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/blog/${post.shortId}`}
                    className="block text-white/80 hover:text-white text-xs font-medium transition-colors duration-300 line-clamp-2"
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {tableOfContents && tableOfContents.length > 0 && (
          <div className="border-t border-white/20">
            <div className="p-4">
              <TableOfContents items={tableOfContents} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
