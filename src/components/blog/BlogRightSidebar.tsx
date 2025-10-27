'use client'

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-utils';
import { TableOfContentsItem } from '@/lib/table-of-contents';
import TableOfContents from './TableOfContents';


interface BlogRightSidebarProps {
  tableOfContents?: TableOfContentsItem[];
  posts?: BlogPost[];
}

export default function BlogRightSidebar({ tableOfContents, posts: serverPosts }: BlogRightSidebarProps) {
  const [isContentsSticky, setIsContentsSticky] = useState(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Memoize the data to prevent infinite re-renders
  const { tags, topPosts } = useMemo(() => {
    // Only use server-side posts to prevent hydration mismatch
    const posts = serverPosts || [];
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    
    // Get top 5 posts (most recent or featured)
    const topPostsData = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((post) => ({
        id: post.id,
        shortId: post.shortId,
        title: post.title
      }));

    return {
      tags: uniqueTags,
      topPosts: topPostsData
    };
  }, [serverPosts]); // Include serverPosts in dependency array

  useEffect(() => {
    const handleScroll = () => {
      if (contentsRef.current) {
        const rect = contentsRef.current.getBoundingClientRect();
        // Make it sticky when the top of the contents section reaches the top of the viewport
        const isSticky = rect.top <= 0;
        setIsContentsSticky(isSticky);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sidebarRef}>
      <div className="bg-black font-cyber">
        {/* Tags Section */}
        <div className="p-4">
          <h3 className="text-base font-bold text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog?tag=${tag.toLowerCase()}`}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full text-white/80 hover:text-white text-xs transition-all duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts Section */}
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

        {/* Contents Section - Sticky at top when post is selected */}
        {tableOfContents && tableOfContents.length > 0 && (
          <div className="relative">
            {/* Normal Contents Section - Hidden when sticky */}
            <div 
              ref={contentsRef} 
              className={`bg-black border-t border-white/20 ${isContentsSticky ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="p-4">
                <TableOfContents items={tableOfContents} />
              </div>
            </div>
            
            {/* Sticky Contents Section */}
            {isContentsSticky && (
              <div 
                className="fixed top-0 right-0 bg-black border-l border-white/20 z-50 max-h-screen overflow-y-auto"
                style={{ 
                  width: '25%',
                  minWidth: '300px',
                  maxWidth: '400px'
                }}
              >
                <div className="p-4">
                  <TableOfContents items={tableOfContents} />
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
