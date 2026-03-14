'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FileText, Home, Menu, Tags, X } from 'lucide-react';
import { socialLinks } from '@/data/constants';

interface BlogMobileMenuProps {
  title: string;
  currentView?: 'posts' | 'tags';
}

export default function BlogMobileMenu({ title, currentView = 'posts' }: BlogMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/20">
        <div className="flex items-center justify-between pl-4 pr-6 py-3 font-cyber text-sm">
          <span className="text-white font-semibold">{title}</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="inline-flex items-center justify-center p-2 rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors duration-200"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-3 right-4 inline-flex items-center justify-center p-2 rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center font-cyber"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-4 w-full max-w-xs">
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-colors duration-200 ${
                  currentView === 'posts'
                    ? 'border-white/40 bg-white/15 text-white'
                    : 'border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Posts</span>
              </Link>

              <Link
                href="/blog/tags"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-colors duration-200 ${
                  currentView === 'tags'
                    ? 'border-white/40 bg-white/15 text-white'
                    : 'border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                }`}
              >
                <Tags className="h-4 w-4" />
                <span>Tags</span>
              </Link>

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 text-white/90 px-4 py-3 hover:bg-white/10 transition-colors duration-200"
              >
                <Home className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks
                .filter(({ label }) => label !== 'Blog')
                .map(({ Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    title={label}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-3 rounded-full border border-white/25 bg-white/10 text-white/90 hover:bg-white/20 transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
