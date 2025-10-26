'use client'

import { motion } from 'framer-motion';
import { AboutMeSection } from './AboutMeSection';
import { SocialLinks } from '../shared/SocialLinks';

export const Body = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-screen flex flex-col relative"
  >
    {/* Fixed Header Section */}
    <div className="sticky top-0 z-10 py-6 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-cyber-100">
            About Me
          </h2>
          <p className="text-cyber-300">
            Learn more about my background and expertise
          </p>
        </div>
        <div className="hidden md:flex">
          <SocialLinks minimal />
        </div>
      </div>
    </div>

    {/* Scrollable About Me Section */}
    <div className="flex-1 overflow-y-auto pt-6 hide-scrollbar">
      <AboutMeSection />
    </div>
  </motion.div>
);