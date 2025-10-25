'use client'

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogRightSidebar from '@/components/blog/BlogRightSidebar';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import TagsView from '@/components/blog/TagsView';
import Breadcrumb from '@/components/blog/Breadcrumb';
import MobileNavbar from '@/components/blog/MobileNavbar';
import { TableOfContentsItem } from '@/lib/table-of-contents';
import { BlogPost } from '@/lib/blog-utils';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [breadcrumb, setBreadcrumb] = useState<Array<{label: string, path?: string}>>([
    { label: 'Blog', path: '/blog' }
  ]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'posts' | 'tags'>('posts');
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset state when URL changes (e.g., when clicking "All Posts")
  useEffect(() => {
    if (isMounted) {
      setSelectedPost(null);
      setCurrentPage(1);
      setBreadcrumb([{ label: 'Blog', path: '/blog' }]);
    }
  }, [searchParams, isMounted]);

  // Handle URL parameters for view and tag filtering
  useEffect(() => {
    if (isMounted && searchParams) {
      const view = searchParams.get('view');
      const tag = searchParams.get('tag');
      
      if (view === 'tags') {
        setCurrentView('tags');
        setBreadcrumb([
          { label: 'Blog', path: '/blog' },
          { label: 'Tags', path: '/blog?view=tags' }
        ]);
      } else if (tag) {
        setCurrentView('posts');
        setSelectedTag(tag);
        const filtered = posts.filter(post => 
          post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
        );
        setFilteredPosts(filtered);
        setBreadcrumb([
          { label: 'Blog', path: '/blog' },
          { label: `Tag: ${tag}`, path: `/blog?tag=${tag}` }
        ]);
      } else {
        setCurrentView('posts');
        setSelectedTag(null);
        setFilteredPosts(posts);
        setBreadcrumb([{ label: 'Blog', path: '/blog' }]);
      }
    }
  }, [searchParams, isMounted, posts]);

  const handlePostSelect = (postId: string, postTitle: string) => {
    setSelectedPost(postId);
    setBreadcrumb([
      { label: 'Blog', path: '/blog' },
      { label: postTitle }
    ]);
    
    // Scroll to top when selecting a post
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setBreadcrumb([{ label: 'Blog', path: '/blog' }]);
    setTableOfContents([]);
  };

  const handleTableOfContentsChange = useCallback((toc: TableOfContentsItem[]) => {
    setTableOfContents(toc);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    if (isMounted) {
      setCurrentView('posts');
      setSelectedTag(tag);
      const filtered = posts.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      );
      setFilteredPosts(filtered);
      setBreadcrumb([
        { label: 'Blog', path: '/blog' },
        { label: `Tag: ${tag}`, path: `/blog?tag=${tag}` }
      ]);
      setSelectedPost(null);
      setCurrentPage(1);
    }
  }, [isMounted, posts]);

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
            />
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* Left Sidebar - Profile & Navigation (Desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <BlogSidebar />
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
                 {selectedPost ? (
                   <BlogPostDetail
                     postId={selectedPost}
                     onBack={handleBackToList}
                     onTableOfContentsChange={handleTableOfContentsChange}
                   />
                 ) : currentView === 'tags' ? (
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
               </div>
          </div>

          {/* Right Sidebar - Tags & Top Posts (Desktop) */}
          <div className={`hidden lg:flex lg:col-span-3 flex-col ${selectedPost ? '' : 'sticky top-0 h-screen'}`}>
            <BlogRightSidebar tableOfContents={selectedPost ? tableOfContents : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
