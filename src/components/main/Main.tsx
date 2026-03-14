'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mainSectionConfig, socialLinks } from '@/data/constants';

interface MainProps {
  scrollOffset?: number;
}

export const Main = ({ scrollOffset = 0 }: MainProps) => {
  const [scrolled, setScrolled] = useState(false);
  const parallaxY = Math.min(scrollOffset * 0.12, 80);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 z-0 pointer-events-none">
        <img
          src="/images/header.jpeg"
          alt="Header background"
          className="h-full w-full object-cover blur-sm scale-100 opacity-70"
          style={{ transform: `translateY(${parallaxY}px) scale(1.05)` }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />
      </div>

      <motion.div
        animate={{
          opacity: scrolled ? 0 : 1,
          y: scrolled ? -50 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center relative z-20 py-4 md:py-8"
      >
        <div className="w-full max-w-4xl px-2 md:px-4 lg:px-6">
          <div className="flex flex-col justify-center items-center text-center space-y-4 md:space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1
                className="text-2xl md:text-3xl lg:text-5xl font-bold text-cyber-100 tracking-tight"
              >
                {mainSectionConfig.profile.name}
              </h1>
              <div className="space-y-2">
                <h2
                  className="text-lg md:text-xl lg:text-2xl text-cyber-200 font-medium"
                >
                  {mainSectionConfig.profile.title}
                </h2>
                <p className="text-cyber-300 text-sm md:text-base lg:text-lg">
                  {mainSectionConfig.profile.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  title={label}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    p-2 md:p-3
                    bg-black
                    border
                    border-white/20
                    rounded-lg
                    cursor-pointer
                    hover:bg-white/5
                    hover:border-white/40
                    transition-all
                    duration-300
                    group"
                >
                  <Icon
                    className="
                    h-3 w-3 md:h-4 md:w-4
                    text-cyber-100
                    group-hover:text-white
                    transition-colors
                    duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
