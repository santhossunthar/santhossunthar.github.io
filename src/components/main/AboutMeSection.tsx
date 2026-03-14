import { AboutSection } from './sections/AboutSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { InterestsSection } from './sections/InterestsSection';
import { aboutContent } from '@/data/constants';

export const AboutMeSection = () => {
  return (
    <div className="about-me-section space-y-6 px-1 py-4 text-cyber-200">
      <section id="about" className="min-h-screen snap-start flex items-start lg:items-center">
        <div className="w-full bg-cyber-900/20 border border-cyber-400/20 rounded-xl p-4 md:p-6">
          <AboutSection />
        </div>
      </section>

      <section id="education" className="min-h-screen snap-start flex items-start lg:items-center">
        <div className="w-full bg-cyber-900/20 border border-cyber-400/20 rounded-xl p-4 md:p-6">
          <EducationSection />
        </div>
      </section>

      <section id="certifications" className="min-h-screen snap-start flex items-start lg:items-center">
        <div className="w-full bg-cyber-900/20 border border-cyber-400/20 rounded-xl p-4 md:p-6">
          <CertificationsSection />
        </div>
      </section>

      <section id="expertise" className="min-h-screen snap-start flex items-start lg:items-center">
        <div className="w-full bg-cyber-900/20 border border-cyber-400/20 rounded-xl p-4 md:p-6">
          <ExpertiseSection />
        </div>
      </section>

      <section id="interests" className="min-h-screen snap-start flex items-start lg:items-center">
        <div className="w-full bg-cyber-900/20 border border-cyber-400/20 rounded-xl p-4 md:p-6">
          <InterestsSection />
        </div>
      </section>
    </div>
  );
};
