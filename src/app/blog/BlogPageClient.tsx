'use client'

import { useState, useEffect, useCallback, Suspense, lazy, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import MobileNavbar from '@/components/blog/MobileNavbar';
import { BlogPost } from '@/lib/blog-utils';

// Lazy load heavy components
const BlogPostList = lazy(() => import('@/components/blog/BlogPostList'));
const TagsView = lazy(() => import('@/components/blog/TagsView'));

interface BlogPageClientProps {
  posts: BlogPost[];
  initialView?: 'posts' | 'tags';
}

export default function BlogPageClient({ posts, initialView = 'posts' }: BlogPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'posts' | 'tags'>(initialView);
  const searchParams = useSearchParams();

  // Optimize breadcrumb computation
  const breadcrumb = useMemo(() => {
    if (currentView === 'tags') {
      return [{ label: 'Blog', path: '/blog' }, { label: 'Tags' }];
    }
    if (selectedTag) {
      return [
        { label: 'Blog', path: '/blog' },
        { label: 'Tag', path: `/blog?tag=${selectedTag}` }
      ];
    }
    return [{ label: 'Blog', path: '/blog' }];
  }, [currentView, selectedTag]);

  // Optimize filtered posts computation
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [posts, selectedTag]);

  // Single optimized useEffect for URL handling
  useEffect(() => {
    setIsMounted(true);
    
    if (searchParams) {
      const tag = searchParams.get('tag');
      
      if (tag) {
        setCurrentView('posts');
        setSelectedTag(tag);
        setCurrentPage(1);
      } else if (initialView === 'posts') {
        setCurrentView('posts');
        setSelectedTag(null);
        setCurrentPage(1);
      }
    }
  }, [searchParams, initialView]);

  const handlePostSelect = (post: BlogPost) => {
    // Navigate to individual post page using shortId
    window.location.href = `/blog/${post.shortId}`;
  };


  const handleTagClick = useCallback((tag: string) => {
    if (isMounted) {
      setCurrentView('posts');
      setSelectedTag(tag);
      setCurrentPage(1);
    }
  }, [isMounted]);

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <MobileNavbar 
          breadcrumb={breadcrumb}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / 6)}
          currentView={currentView}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div 
            className="w-80 h-full bg-black border-r border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <BlogSidebar 
              onClose={() => setIsMobileSidebarOpen(false)}
              currentView={currentView}
            />
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* Left Sidebar - Profile & Navigation (Desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar currentView={currentView} />
          </div>

          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-7 px-4 border-r border-white/20">
            {/* Desktop Breadcrumb */}
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={breadcrumb} />
            </div>
            
            {/* Mobile content padding */}
            <div className="lg:hidden pt-16"></div>
            
               <div className="relative z-0">
                 <Suspense fallback={
                   <div className="flex items-center justify-center py-12">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                   </div>
                 }>
                   {currentView === 'tags' ? (
                     <TagsView
                       posts={posts}
                       onTagClick={handleTagClick}
                     />
                   ) : (
                     <BlogPostList
                       currentPage={currentPage}
                       onPageChange={setCurrentPage}
                       onPostSelect={handlePostSelect}
                       posts={filteredPosts}
                     />
                   )}
                 </Suspense>
               </div>
          </div>

          {/* Right Sidebar - Tags & Top Posts (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col sticky top-0 h-screen">
            <BlogRightSidebar posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
