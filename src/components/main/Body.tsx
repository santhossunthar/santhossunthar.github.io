'use client'

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { AboutMeSection } from './AboutMeSection';

export const Body = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full relative"
    >
      {/* Let the main page scroller handle section-to-section scrolling */}
      <div className="pt-6">
        <AboutMeSection />
      </div>
    </motion.div>
  );
};
