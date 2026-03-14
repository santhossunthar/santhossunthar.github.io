'use client';

import { useEffect, useRef, useState } from 'react';
import { Main } from '@/components/main/Main';
import { Body } from '@/components/main/Body';
import { homePageConfig, socialLinks } from '@/data/constants';

const Home = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showTopNav, setShowTopNav] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onScroll = () => {
      const threshold = node.clientHeight * homePageConfig.topNavShowThresholdRatio;
      setScrollTop(node.scrollTop);
      setShowTopNav(node.scrollTop >= threshold);
    };

    node.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => node.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        bg-background 
        h-screen 
        w-full 
        overflow-y-scroll 
        overflow-x-hidden
        scroll-smooth"
    >
      <div
        className={`fixed top-0 left-0 right-0 z-40 border-b border-white/15 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
          showTopNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-black/50 text-[11px] font-bold text-cyber-100">
              S
            </span>
            <span className="text-xs md:text-sm tracking-wide text-cyber-100 font-medium">
              {homePageConfig.topNavTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                title={label}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/15 bg-black/50 p-2 text-cyber-100 transition-colors duration-200 hover:border-white/35 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE 1: Main */}
      <section
        className="
          h-screen 
          w-full 
          flex 
          items-center 
          justify-center"
      >
        <Main scrollOffset={scrollTop} />
      </section>

      {/* PAGE 2: Body */}
      <section
        className="
          w-full 
          flex 
          items-start 
          justify-center 
          bg-background"
        style={{ position: 'relative' }}
      >
        <div className="
          relative 
          z-20 
          mx-auto 
          max-w-5xl 
          w-full 
          px-4 
          sm:px-6 
          lg:px-8"
        >
          <div className="relative pt-4 pb-6">
            <Body />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
