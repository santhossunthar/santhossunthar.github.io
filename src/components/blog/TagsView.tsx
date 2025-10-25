'use client'

import { BlogPost } from '@/lib/blog-utils';
import { useMemo } from 'react';

interface TagsViewProps {
  posts: BlogPost[];
  onTagClick?: (tag: string) => void;
}

export default function TagsView({ posts, onTagClick }: TagsViewProps) {
  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagCounts: { [key: string]: number } = {};
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Sort tags by count (most used first), then alphabetically
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => {
        if (a.count !== b.count) {
          return b.count - a.count; // Higher count first
        }
        return a.tag.localeCompare(b.tag); // Alphabetical for same count
      });
  }, [posts]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">All Tags</h1>
        <p className="text-white/70">Browse posts by category</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="group p-6 bg-black border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:bg-white/5"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-white mb-2">
                {tag}
              </h3>
              <p className="text-white/60 text-sm">
                {count} {count === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </button>
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
