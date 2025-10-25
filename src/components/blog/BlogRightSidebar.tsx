'use client'

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { getAllPosts, getTopPosts } from '@/lib/blog-utils';
import { TableOfContentsItem } from '@/lib/table-of-contents';
import TableOfContents from './TableOfContents';


interface BlogRightSidebarProps {
  tableOfContents?: TableOfContentsItem[];
}

export default function BlogRightSidebar({ tableOfContents }: BlogRightSidebarProps) {
  const [isContentsSticky, setIsContentsSticky] = useState(false);
  const contentsRef = useRef<HTMLDivElement>(null);

  // Memoize the data to prevent infinite re-renders
  const { tags, topPosts } = useMemo(() => {
    const posts = getAllPosts();
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    
    const topPostsData = getTopPosts(5).map(post => ({
      id: post.id,
      title: post.title,
      views: Math.floor(Math.random() * 1000) + 500 // Mock view count
    }));

    return {
      tags: uniqueTags,
      topPosts: topPostsData
    };
  }, []); // Empty dependency array since we want this to run only once

  useEffect(() => {
    const handleScroll = () => {
      if (contentsRef.current) {
        const rect = contentsRef.current.getBoundingClientRect();
        const isSticky = rect.top <= 0;
        setIsContentsSticky(isSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen">
      <div className="bg-black border border-white/20 h-full font-cyber">
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

        {/* Horizontal Divider */}
        <div className="border-t border-white/20"></div>

        {/* Recent Posts Section */}
        <div className="p-4">
          <h3 className="text-base font-bold text-white mb-3">Recent Posts</h3>
          <div className="space-y-2">
            {topPosts.map((post, index) => (
              <div key={post.id} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/blog/${post.id}`}
                    className="block text-white/80 hover:text-white text-xs font-medium transition-colors duration-300 line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-white/60 text-xs mt-1">{post.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/20"></div>

        {/* Contents Section - Sticky at top when post is selected */}
        {tableOfContents && tableOfContents.length > 0 && (
          <>
            {/* Normal Contents Section */}
            <div ref={contentsRef} className="bg-black border-b border-white/20">
              <div className="p-4">
                <TableOfContents items={tableOfContents} />
              </div>
            </div>
            
            {/* Sticky Contents Section */}
            {isContentsSticky && (
              <div 
                className="fixed top-0 right-0 w-1/4 bg-black border-l border-white/20 z-50 max-h-screen overflow-y-auto"
                style={{ width: '25%' }}
              >
                <div className="p-4">
                  <TableOfContents items={tableOfContents} />
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
