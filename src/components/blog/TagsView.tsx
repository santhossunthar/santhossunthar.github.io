import Link from 'next/link';
import { BlogPost, slugifyTag } from '@/lib/blog-utils';

interface TagsViewProps {
  posts: BlogPost[];
}

export default function TagsView({ posts }: TagsViewProps) {
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  const allTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count;
      }
      return a.tag.localeCompare(b.tag);
    });

  return (
    <div className="space-y-6">
      <div className="hidden lg:block text-center">
        <h1 className="text-3xl font-bold text-white mb-2">All Tags</h1>
        <p className="text-white/70">Browse posts by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/blog/tags/${slugifyTag(tag)}`}
            className="group p-6 bg-black border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:bg-white/5"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white mb-2">{tag}</h3>
              <p className="text-white/60 text-sm">
                {count} {count === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {allTags.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No tags found</p>
        </div>
      )}
    </div>
  );
}
