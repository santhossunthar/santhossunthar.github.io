'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';
import Image from 'next/image';

export const Main = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showThunder, setShowThunder] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [lightningPersist, setLightningPersist] = useState(false);

  useEffect(() => {
    // Trigger thunder, glitch, and lightning effects on page load
    console.log('Thunder, glitch, and lightning effects triggered on page load');
    setShowThunder(true);
    setShowGlitch(true);
    setLightningPersist(true);
    console.log('Lightning persist set to true');
    
    setTimeout(() => {
      setShowThunder(false);
      setShowGlitch(false);
      console.log('Thunder and glitch effects ended');
    }, 3000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Trigger glitch effect on scroll
      const glitchElements = document.querySelectorAll('.glitch');
      glitchElements.forEach(element => {
        element.classList.add('scroll-glitch');
        setTimeout(() => {
          element.classList.remove('scroll-glitch');
        }, 1000);
      });

      // Trigger thunder effect on scroll
      setShowThunder(true);
      setTimeout(() => {
        setShowThunder(false);
      }, 5000);
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
      <motion.div
        animate={{ 
          opacity: scrolled ? 0 : 1,
          y: scrolled ? -50 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="h-screen flex items-center relative z-20"
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
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

                  <div className="relative rounded-full overflow-hidden">
                    <Image
                      src="/images/picture.jpg"
                      alt="Profile"
                      width={320}
                      height={320}
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
                  whileHover={{ scale: 1.1 }}
                  className="
                    p-3 
                    rounded-full 
                    bg-cyber-800/80 
                    hover:bg-cyber-700 
                    border 
                    border-cyber-600/50 
                    transition-all 
                    duration-300
                    hover:border-cyber-400 
                    cyber-glow 
                    group"
                >
                  <Icon className="
                    h-5 
                    w-5 
                    text-cyber-200 
                    group-hover:text-cyber-100 
                    transition-colors 
                    duration-300" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
