'use client'

import { useRef } from 'react';
import { Main } from '@/components/main/Main';
import { Sidebar } from '@/components/shared/Sidebar';
import { Body } from '@/components/main/Body';

const Home = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="
        bg-background 
        h-screen 
        w-full 
        overflow-y-scroll 
        scroll-smooth 
        scroll-snap-y 
        mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* PAGE 1: Main */}
      <section
        className="
          h-screen 
          w-full 
          flex 
          items-center 
          justify-center 
          scroll-snap-start"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Accent Line */}
        <div className="
          absolute 
          left-0 
          top-0 
          bottom-0 
          w-1 
          bg-gradient-to-b
          from-cyber-400 
          to-cyber-600"
        />          
        <Main />
      </section>

      {/* PAGE 2: Sidebar + Body */}
      <section
        className="
          min-h-screen 
          w-full 
          flex 
          items-start 
          justify-center 
          scroll-snap-start 
          bg-background"
        style={{ scrollSnapAlign: 'start', position: 'relative' }}
      >
        {/* Horizontal line */}
        <div
          className="absolute left-0 right-0 z-0 pointer-events-none"
          style={{ top: '7.5rem' }}
        >
          <div className="
            w-screen 
            h-[3px] 
            bg-gradient-to-r 
            from-transparent 
            via-cyber-400/50 
            to-transparent" 
          />
        </div>

        <div className="
          relative 
          z-20 
          mx-auto 
          max-w-5xl 
          w-full 
          px-4 
          sm:px-6 
          lg:px-8 
          grid 
          grid-cols-1 
          lg:grid-cols-[250px_1fr] 
          gap-4"
        >
          <div className="sticky top-8 self-start z-10">
            <div className="
              rounded-xl 
              overflow-hidden 
              bg-cyber-800/95 
              backdrop-blur 
              shadow-xl 
              border 
              border-cyber-400"
            >
              <Sidebar />
            </div>
          </div>
          <div className="relative pt-4 pb-6">
            <Body />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
