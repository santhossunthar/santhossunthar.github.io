'use client'

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AboutMeSection } from './AboutMeSection';
import { SocialLinks } from '../shared/SocialLinks';

export const Body = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    'about',
    'education', 
    'expertise',
    'interests'
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
    // Scroll to top of the section
    setTimeout(() => {
      const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 100);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
    // Scroll to top of the section
    setTimeout(() => {
      const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 100);
  };

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSection();
    }
    if (isRightSwipe) {
      prevSection();
    }
  };

  // Function to scroll to top of section
  const scrollToTop = () => {
    setTimeout(() => {
      const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 100);
  };

  // Handle section change via dots
  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    scrollToTop();
  };

  // Reset scroll position when section changes
  useEffect(() => {
    scrollToTop();
  }, [currentSection]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen flex flex-col relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-10 py-6 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-cyber-100">
              About Me
            </h2>
            <p className="text-cyber-300">
              Learn more about my background and expertise
            </p>
          </div>
          <div className="hidden lg:flex">
            <SocialLinks minimal />
          </div>
        </div>
      </div>

      {/* Navigation Controls - Right below header */}
      <div className="relative z-20 flex items-center justify-between px-8 py-4">
        {/* Previous Button */}
        <button
          onClick={prevSection}
          className="w-10 h-10 bg-cyber-800/30 hover:bg-cyber-700/40 border border-cyber-400/20 hover:border-cyber-400/40 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-105"
          aria-label="Previous section"
        >
          <svg className="w-5 h-5 text-cyber-300 group-hover:text-cyber-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Section Dots */}
        <div className="flex space-x-2">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => handleSectionChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-cyber-400/80 scale-125' 
                  : 'bg-cyber-600/50 hover:bg-cyber-500/60'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSection}
          className="w-10 h-10 bg-cyber-800/30 hover:bg-cyber-700/40 border border-cyber-400/20 hover:border-cyber-400/40 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-105"
          aria-label="Next section"
        >
          <svg className="w-5 h-5 text-cyber-300 group-hover:text-cyber-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scrollable About Me Section */}
      <div 
        className="flex-1 overflow-y-auto pt-6 hide-scrollbar"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AboutMeSection currentSection={currentSection} />
      </div>
    </motion.div>
  );
};