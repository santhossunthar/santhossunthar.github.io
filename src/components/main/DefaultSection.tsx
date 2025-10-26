'use client'

import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';

interface DefaultSectionProps {
  showGlitch: boolean;
}

export const DefaultSection = ({ showGlitch }: DefaultSectionProps) => {
  return (
    <div className="space-y-4">
      <h1 className={`text-5xl font-bold text-cyber-100 tracking-tight glitch ${showGlitch ? 'page-load-glitch' : ''}`} data-text="SANTHOS SUNTHARALINGAM">
        SANTHOS SUNTHARALINGAM
      </h1>
      <div className="space-y-2">
        <h2 className={`text-2xl text-cyber-200 font-medium glitch ${showGlitch ? 'page-load-glitch' : ''}`} data-text="SECURITY RESEARCHER">
          SECURITY RESEARCHER
        </h2>
        <p className="text-cyber-300 text-lg">
          BSc (Hons) in Software Engineering
          <span className="block text-cyber-400 text-base">
            University of Kelaniya, Sri Lanka
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {socialLinks.map(({ Icon, href, label }, index) => (
          <motion.a
            key={index}
            href={href}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="
              inline-flex 
              items-center 
              gap-2 
              px-4 
              py-2 
              bg-black 
              border 
              border-white/20 
              rounded-lg 
              cursor-pointer 
              hover:bg-white/5 
              hover:border-white/40 
              cyber-glow 
              transition-all 
              duration-300 
              group"
          >
            <Icon className="
              h-4 
              w-4 
              text-cyber-100 
              group-hover:text-white 
              transition-colors 
              duration-300" 
            />
            <span className="
              text-xs 
              text-cyber-100 
              group-hover:text-white 
              transition-colors 
              duration-300
              font-medium"
            >
              {label}
            </span>
          </motion.a>
        ))}
        
        <motion.a
          href="/blog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            inline-flex 
            items-center 
            gap-2 
            px-4 
            py-2 
            bg-black 
            border 
            border-white/20 
            rounded-lg 
            cursor-pointer 
            hover:bg-white/5 
            hover:border-white/40 
            text-cyber-100 
            font-medium 
            transition-all 
            duration-300 
            cyber-glow 
            group
            text-xs"
        >
          <svg 
            className="w-4 h-4 text-cyber-100 group-hover:text-white transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
            />
          </svg>
          <span>Blog</span>
        </motion.a>
      </div>
    </div>
  );
};
