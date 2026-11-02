import Image from 'next/image';
import Link from 'next/link';
import { FlaskConical, Settings } from 'lucide-react';
import { socialLinks } from '@/data/constants';

interface LabSidebarProps {
  currentView?: 'labs' | 'setup';
}

export default function LabSidebar({ currentView = 'labs' }: LabSidebarProps) {
  return (
    <div className="h-screen">
      <div className="bg-black border border-white/20 p-4 h-full flex flex-col font-cyber">
        <div className="text-center mb-4">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <div className="w-20 h-20 rounded-full border-2 border-white/40 bg-white/10 flex items-center justify-center">
              <Image
                src="/images/blog-profile-icon.png"
                alt="CTF Labs avatar"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">CTF Labs</h3>
          <p className="text-white/70 text-xs">CTF for Exams</p>
        </div>

        <div className="space-y-2 mb-6">
          <Link
            href="/labs/"
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              currentView === 'labs'
                ? 'text-white bg-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <FlaskConical className="h-4 w-4" />
            <span>Labs</span>
          </Link>
          <Link
            href="/labs/setup/"
            className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
              currentView === 'setup'
                ? 'text-white bg-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Lab Manager</span>
          </Link>
        </div>

        <div className="flex-1"></div>

        <div className="border-t border-white/20 pt-4 text-center">
          <h4 className="text-white font-medium mb-3 text-sm">Connect</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks
              .filter(({ label }) => label !== 'Blog')
              .map(({ Icon, href, label }, index) => (
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
