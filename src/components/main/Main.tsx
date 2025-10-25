'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';
import Image from 'next/image';

export const Main = () => {
  const [showThunder, setShowThunder] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [lightningPersist, setLightningPersist] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);

  useEffect(() => {
    // Trigger thunder, glitch, lightning, and flash effects on page load
    console.log('Thunder, glitch, lightning, and flash effects triggered on page load');
    setShowThunder(true);
    setShowGlitch(true);
    setLightningPersist(true);
    setShowFlash(true);
    console.log('Lightning persist set to true');
    
    setTimeout(() => {
      setShowThunder(false);
      setShowGlitch(false);
      console.log('Thunder and glitch effects ended');
    }, 3000);
    
    setTimeout(() => {
      setShowFlash(false);
      console.log('Flash effect ended');
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show About Me section when user scrolls down more than 100px
      if (scrollY > 100) {
        setShowAboutMe(true);
      } else {
        setShowAboutMe(false);
      }
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
            className="flex flex-col justify-center space-y-8 px-1 h-screen overflow-y-auto"
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

            {/* About Me Section - Only shows when scrolling */}
            {showAboutMe && (
              <div className="space-y-6 pt-16 min-h-screen">
              <h3 className="text-2xl font-bold text-cyber-100 border-b border-cyber-400/30 pb-2">
                About Me
              </h3>
              
              <div className="space-y-4 text-cyber-200">
                <p className="text-lg leading-relaxed">
                  I'm a passionate Security Researcher and Software Engineer with expertise in 
                  cybersecurity, web application security, and secure software development.
                </p>
                
                <p className="text-base leading-relaxed">
                  My journey in technology began with a strong foundation in Software Engineering 
                  from the University of Kelaniya, where I developed a deep understanding of 
                  both development and security practices.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-cyber-100">Key Expertise:</h4>
                  <ul className="space-y-2 text-cyber-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
                      Web Application Security & Penetration Testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
                      Linux System Security & Hardening
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
                      Secure Software Development Lifecycle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
                      Vulnerability Assessment & Risk Analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
                      Modern Web Technologies (React, Next.js, Node.js)
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-cyber-100">Current Focus:</h4>
                  <p className="text-base leading-relaxed text-cyber-300">
                    I'm currently focused on advancing cybersecurity research, developing secure 
                    applications, and sharing knowledge through technical writing and community 
                    engagement. My goal is to bridge the gap between development and security 
                    practices in modern software engineering.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-cyber-100">Interests:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Cybersecurity', 'Web Security', 'Linux', 'Python', 'JavaScript', 'DevOps', 'Cloud Security', 'Penetration Testing'].map((interest) => (
                      <span 
                        key={interest}
                        className="px-3 py-1 bg-cyber-800/50 border border-cyber-400/30 rounded-full text-cyber-200 text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
