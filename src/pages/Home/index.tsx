import { Main } from '@/components/main/Main';
import { Body } from '@/components/main/Body';

const Home = () => {
  return (
    <div
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
        <Main />
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
