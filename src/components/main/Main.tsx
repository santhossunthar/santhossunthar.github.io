'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mainSectionConfig, socialLinks } from '@/data/constants';

export const Main = () => {
  const [showThunder, setShowThunder] = useState(true);
  const [showGlitch, setShowGlitch] = useState(true);
  const [runProfileSpin, setRunProfileSpin] = useState(true);
  const [flashPhase, setFlashPhase] = useState<'off' | 'first' | 'second'>('off');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Two quick thunder flashes at intro, then settle.
    setFlashPhase('first');

    const firstFlashOffTimer = setTimeout(() => {
      setFlashPhase('off');
    }, mainSectionConfig.intro.firstFlashOffMs);

    const secondFlashOnTimer = setTimeout(() => {
      setFlashPhase('second');
    }, mainSectionConfig.intro.secondFlashOnMs);

    const secondFlashOffTimer = setTimeout(() => {
      setFlashPhase('off');
    }, mainSectionConfig.intro.secondFlashOffMs);

    const introEndTimer = setTimeout(() => {
      setShowThunder(false);
      setShowGlitch(false);
    }, mainSectionConfig.intro.introEndMs);

    const profileSpinEndTimer = setTimeout(() => {
      setRunProfileSpin(false);
    }, mainSectionConfig.intro.introEndMs + 180);

    return () => {
      clearTimeout(firstFlashOffTimer);
      clearTimeout(secondFlashOnTimer);
      clearTimeout(secondFlashOffTimer);
      clearTimeout(introEndTimer);
      clearTimeout(profileSpinEndTimer);
    };
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
        <div className="thunder-bg thunder-ambient" data-testid="thunder-bg" />
      )}
      <div className="thunder-lines" data-testid="thunder-lines" />
      {flashPhase !== 'off' && (
        <div
          className={`thunder-bg ${flashPhase === 'first' ? 'thunder-burst-1' : 'thunder-burst-2'}`}
          data-testid="flash-effect"
        />
      )}

      <motion.div
        animate={{
          opacity: scrolled ? 0 : 1,
          y: scrolled ? -50 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center relative z-20 py-4 md:py-8"
      >
        <div className="grid w-full grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center"
          >
            <div className="relative w-full h-64 md:h-80 lg:h-screen">
              <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute -inset-16 md:-inset-20 lg:-inset-28">
                    {mainSectionConfig.rings.outerRotations.map((rotation) => (
                      <div
                        key={`outer-${rotation}`}
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        <div
                          className="
                          absolute
                          top-0
                          left-1/2
                          w-[2px] md:w-[3px]
                          h-8 md:h-12 lg:h-16
                          bg-gradient-to-b
                          from-cyber-400
                          to-transparent
                          -translate-x-1/2
                          origin-bottom"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute -inset-12 md:-inset-16 lg:-inset-20">
                    {mainSectionConfig.rings.middleRotations.map((rotation) => (
                      <div
                        key={`middle-${rotation}`}
                        className="absolute w-full h-full"
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          animation: 'spin 3s linear infinite',
                          animationPlayState: runProfileSpin ? 'running' : 'paused',
                        }}
                      >
                        <div
                          className="
                          absolute top-0
                          left-1/2
                          w-[1px] md:w-[2px]
                          h-6 md:h-10 lg:h-14
                          bg-gradient-to-b
                          from-cyber-300
                          to-transparent
                          -translate-x-1/2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute -inset-10 md:-inset-12 lg:-inset-16">
                    {mainSectionConfig.rings.innerRotations.map((rotation) => (
                      <div
                        key={`inner-${rotation}`}
                        className="absolute w-full h-full"
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                          animationPlayState: runProfileSpin ? 'running' : 'paused',
                        }}
                      >
                        <div
                          className="
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
                    <img
                      src={mainSectionConfig.profile.imageSrc}
                      alt={mainSectionConfig.profile.imageAlt}
                      className="
                        relative
                        h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80
                        rounded-full
                        object-cover
                        border-2 border-cyber-900"
                    />
                    <div
                      className="
                      absolute
                      inset-0
                      rounded-full
                      bg-gradient-radial
                      from-cyber-400/10
                      via-transparent
                      to-transparent"
                    />
                  </div>

                  <div className="[--dot-orbit:124px] md:[--dot-orbit:156px] lg:[--dot-orbit:196px]">
                    {mainSectionConfig.rings.dotRotations.map((rotation) => (
                      <div
                        key={`dot-${rotation}`}
                        className="
                          absolute
                          w-2
                          h-2
                          rounded-full
                          bg-cyber-400/80"
                        style={{
                          left: `calc(50% + ${Math.cos((rotation * Math.PI) / 180)} * var(--dot-orbit))`,
                          top: `calc(50% + ${Math.sin((rotation * Math.PI) / 180)} * var(--dot-orbit))`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-4 md:space-y-6 lg:space-y-8 px-2 md:px-4 lg:px-1"
          >
            <div className="space-y-4">
              <h1
                className={`text-2xl md:text-3xl lg:text-5xl font-bold text-cyber-100 tracking-tight glitch ${showGlitch ? 'page-load-glitch' : ''}`}
                data-text={mainSectionConfig.profile.name}
              >
                {mainSectionConfig.profile.name}
              </h1>
              <div className="space-y-2">
                <h2
                  className={`text-lg md:text-xl lg:text-2xl text-cyber-200 font-medium glitch ${showGlitch ? 'page-load-glitch' : ''}`}
                  data-text={mainSectionConfig.profile.title}
                >
                  {mainSectionConfig.profile.title}
                </h2>
                <p className="text-cyber-300 text-sm md:text-base lg:text-lg">
                  {mainSectionConfig.profile.degree}
                  <span className="block text-cyber-400 text-xs md:text-sm lg:text-base">
                    {mainSectionConfig.profile.university}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
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
                    gap-1 md:gap-2
                    px-2 py-1 md:px-4 md:py-2
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
                  <Icon
                    className="
                    h-3 w-3 md:h-4 md:w-4
                    text-cyber-100
                    group-hover:text-white
                    transition-colors
                    duration-300"
                  />
                  <span
                    className="
                    text-xs md:text-xs
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
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
