import Link from 'next/link';

interface BlogPostMobileNavbarProps {
  postTitle: string;
}

export default function BlogPostMobileNavbar({ postTitle }: BlogPostMobileNavbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/blog"
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          aria-label="Back to blog"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="flex-1 mx-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-2 text-white font-cyber text-sm whitespace-nowrap">
              <span className="font-semibold">{postTitle}</span>
            </div>
          </div>
        </div>

        <Link
          href="/blog"
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          aria-label="Go to blog"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
