'use client'

import { useState, useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface MobileNavbarProps {
  breadcrumb: BreadcrumbItem[];
  onMenuClick: () => void;
}

export default function MobileNavbar({ breadcrumb, onMenuClick }: MobileNavbarProps) {
  const [currentTitle, setCurrentTitle] = useState('Blog');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Get the current page title from breadcrumb
      const title = breadcrumb[breadcrumb.length - 1]?.label || 'Blog';
      setCurrentTitle(title);
    }
  }, [breadcrumb, isMounted]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <div className="flex-1 mx-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-2 text-white font-cyber text-sm whitespace-nowrap">
              {isMounted ? (
                breadcrumb.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <svg
                        className="w-3 h-3 text-white/60 mx-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                    <span className={index === breadcrumb.length - 1 ? 'font-semibold' : 'text-white/80'}>
                      {item.label}
                    </span>
                  </div>
                ))
              ) : (
                <span className="font-semibold">Blog</span>
              )}
            </div>
          </div>
        </div>

        {/* Right side spacer for balance */}
        <div className="w-10"></div>
      </div>
    </div>
  );
}
