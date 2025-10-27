'use client'

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { BlogPost } from '@/lib/blog-utils';

interface BlogPostListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPostSelect: (post: BlogPost) => void;
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 10;

// Animation variants for performance optimization
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
    }
  }
};

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

      <motion.div 
        className="grid gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentPage} // Re-trigger animation on page change
      >
        {paginatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            onClick={() => handlePostClick(post)}
            className="bg-black border border-white/20 rounded-lg p-4 md:p-6 cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all duration-300 group"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
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
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  page === currentPage
                    ? 'bg-white text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * page }}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed border border-white/20 rounded-lg text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
