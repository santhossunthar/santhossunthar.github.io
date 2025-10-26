'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPosts, BlogPost } from '@/lib/blog-utils';

interface BlogPostListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPostSelect: (post: BlogPost) => void;
  posts: BlogPost[];
}


const POSTS_PER_PAGE = 10;

export default function BlogPostList({ currentPage, onPageChange, onPostSelect, posts }: BlogPostListProps) {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Use pre-loaded posts from SSG
    setTotalPages(Math.ceil(posts.length / POSTS_PER_PAGE));
  }, [posts]);

  // Calculate paginated posts from pre-loaded data
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handlePostClick = (post: BlogPost) => {
    onPostSelect(post);
  };

  return (
    <div className="space-y-6 font-cyber">
      {/* Desktop-only title and pagination */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Blog Posts</h1>
        <div className="text-white/70 text-sm">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className="grid gap-6">
        {paginatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handlePostClick(post)}
            className="bg-black border border-white/20 rounded-lg p-6 cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {post.featured && (
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
                    Featured
                  </span>
                )}
                <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                  {post.category}
                </span>
              </div>
              <span className="text-white/60 text-sm">{post.readTime}</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-white/80 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-white/60 text-sm">{post.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white transition-all duration-300"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  page === currentPage
                    ? 'bg-white text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
