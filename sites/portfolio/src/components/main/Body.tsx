import { AboutMeSection } from './AboutMeSection';

export const Body = () => {
  return (
    <div className="w-full relative">
      {/* Let the main page scroller handle section-to-section scrolling */}
      <div className="pt-6">
        <AboutMeSection />
      </div>
    </div>
  );
};
