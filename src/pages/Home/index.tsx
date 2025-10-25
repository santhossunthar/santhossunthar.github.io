'use client'

import { Main } from '@/components/main/Main';

const Home = () => {
  return (
    <div
      className="
        bg-background 
        h-screen 
        w-full"
    >
      <section
        className="
          h-screen 
          w-full 
          flex 
          items-center 
          justify-center"
      >
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

    </div>
  );
};

export default Home;
