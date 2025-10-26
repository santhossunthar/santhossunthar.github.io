'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';

export const Main = () => {
  const [showThunder, setShowThunder] = useState(true);
  const [showGlitch, setShowGlitch] = useState(true);
  const [lightningPersist, setLightningPersist] = useState(true);
  const [showFlash, setShowFlash] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Set up timers to turn off effects after page load
    setTimeout(() => {
      setShowThunder(false);
      setShowGlitch(false);
    }, 3000);
    
    setTimeout(() => {
      setShowFlash(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showThunder && (
        <div className="thunder-bg" data-testid="thunder-bg" />
      )}
      {lightningPersist && (
        <div className="thunder-lines" data-testid="thunder-lines" />
      )}
      {showFlash && (
        <div className="thunder-bg" data-testid="flash-effect" />
      )}
      
      <motion.div
        animate={{ 
          opacity: scrolled ? 0 : 1,
          y: scrolled ? -50 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="h-screen flex items-center relative z-20"
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Profile Image Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center"
          >
            <div className="relative w-full h-screen">
              <div className="
                absolute 
                top-1/2 
                left-1/2 
                -translate-x-1/2 
                -translate-y-1/2"
              >
                <div className="relative">
                  {/* Outer Layer - Broken Circle */}
                  <div className="absolute -inset-28">
                    {[0, 90, 180, 270].map((rotation) => (
                      <div
                        key={`outer-${rotation}`}
                        className="absolute w-full h-full"
                        style={{ 
                          transform: `rotate(${rotation}deg)` 
                        }}
                      >
                        <div className="
                          absolute 
                          top-0 
                          left-1/2 
                          w-[3px] 
                          h-16 
                          bg-gradient-to-b 
                          from-cyber-400 
                          to-transparent 
                          -translate-x-1/2 
                          origin-bottom" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* Middle Layer - Spinning Segments */}
                  <div className="absolute -inset-20">
                    {[45, 135, 225, 315].map((rotation) => (
                      <div
                        key={`middle-${rotation}`}
                        className={`absolute w-full h-full ${showGlitch ? 'animate-spin-slower' : ''}`}
                        style={{ 
                          transform: `rotate(${rotation}deg)` 
                        }}
                      >
                        <div className="
                          absolute top-0 
                          left-1/2 
                          w-[2px] 
                          h-14 
                          bg-gradient-to-b 
                          from-cyber-300 
                          to-transparent 
                          -translate-x-1/2" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* Inner Layer - Pulsing Arcs */}
                  <div className="absolute -inset-16">
                    {[30, 150, 270].map((rotation) => (
                      <div
                        key={`inner-${rotation}`}
                        className={`absolute w-full h-full ${showGlitch ? 'animate-pulse-slow' : ''}`}
                        style={{ 
                          transform: `rotate(${rotation}deg)` 
                        }}
                      >
                        <div className="
                          absolute 
                          top-0 
                          left-1/2 
                          -translate-x-1/2 
                          w-[50%] 
                          h-[2px] 
                          rounded-full
                          bg-gradient-to-r 
                          from-transparent 
                          via-cyber-200 
                          to-transparent" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* Main image */}
                  <div className="relative rounded-full overflow-hidden">
                    <img
                      src="/images/picture.jpg"
                      alt="Profile"
                      className="
                        relative 
                        h-80 
                        w-80 
                        rounded-full 
                        object-cover 
                        border-2 border-cyber-900"
                    />
                    <div className="
                      absolute 
                      inset-0 
                      rounded-full 
                      bg-gradient-radial 
                      from-cyber-400/10 
                      via-transparent 
                      to-transparent" 
                    />
                  </div>

                  {/* Interface dots */}
                  {[60, 180, 300].map((rotation) => (
                    <div
                      key={`dot-${rotation}`}
                      className="
                        absolute 
                        w-2 
                        h-2 
                        rounded-full 
                        bg-cyber-400/80"
                      style={{
                        left: `calc(50% + ${
                          Math.cos(
                            rotation * Math.PI / 180
                          ) * 200}px)`,
                        top: `calc(50% + ${
                          Math.sin(
                            rotation * Math.PI / 180
                          ) * 200}px)`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center space-y-8 px-1"
          >
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
            </div>

            <div className="flex flex-wrap gap-3">
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
