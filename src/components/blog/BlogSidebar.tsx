'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Home, Tags } from 'lucide-react';
import { socialLinks } from '@/data/constants';

interface BlogSidebarProps {
  onClose?: () => void;
  currentView?: 'posts' | 'tags';
}

export default function BlogSidebar({ onClose, currentView }: BlogSidebarProps) {
  const router = useRouter();

  const handleAllPosts = () => {
    router.push('/blog');
    onClose?.();
  };

  const handleTagsFilter = () => {
    router.push('/blog/tags');
    onClose?.();
  };
  return (
    <div className="h-screen">
      <div className="bg-black border border-white/20 p-4 h-full flex flex-col font-cyber">
        {/* Profile Section */}
        <div className="text-center mb-4">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Image
              src="/images/picture.jpg"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-white/40"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Santhos Suntharalingam</h3>
          <p className="text-white/70 text-xs">Security Researcher</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2 mb-6">
          <button 
            onClick={handleAllPosts}
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              currentView === 'posts' 
                ? 'text-white bg-white/10' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Posts</span>
          </button>
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <Home className="h-4 w-4" />
            <span>Portfolio</span>
          </Link>
          <button 
            onClick={handleTagsFilter}
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              currentView === 'tags' 
                ? 'text-white bg-white/10' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Tags className="h-4 w-4" />
            <span>Tags</span>
          </button>
        </div>


        {/* Spacer to push social links to bottom */}
        <div className="flex-1"></div>

        {/* Social Links - Fixed at Bottom */}
        <div className="border-t border-white/20 pt-4 text-center">
          <h4 className="text-white font-medium mb-3 text-sm">Connect</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map(({ Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-white/80 hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
