'use client'

import { useRef, Suspense, lazy } from 'react';

// Lazy load heavy components
const Main = lazy(() => import('@/components/main/Main').then(module => ({ default: module.Main })));
const Body = lazy(() => import('@/components/main/Body').then(module => ({ default: module.Body })));

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
        overflow-x-hidden
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
        <Suspense fallback={
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        }>
          <Main />
        </Suspense>
      </section>

      {/* PAGE 2: Body */}
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
          lg:px-8"
        >
          <div className="relative pt-4 pb-6">
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            }>
              <Body />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
