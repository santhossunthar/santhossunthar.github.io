'use client'

import { AboutSection } from './sections/AboutSection';
import { EducationSection } from './sections/EducationSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { InterestsSection } from './sections/InterestsSection';

interface AboutMeSectionProps {
  currentSection: number;
}

export const AboutMeSection = ({ currentSection }: AboutMeSectionProps) => {
  return (
    <div className="about-me-section space-y-6 pt-8 pb-32 relative min-h-[80vh]">
      {/* Content Sections */}
      <div className="space-y-4 text-cyber-200 min-h-[400px]">
        {/* About Section */}
        {currentSection === 0 && <AboutSection />}

        {/* Education Section */}
        {currentSection === 1 && <EducationSection />}

        {/* Key Expertise Section */}
        {currentSection === 2 && <ExpertiseSection />}

        {/* Interests Section */}
        {currentSection === 3 && <InterestsSection />}
      </div>
    </div>
  );
};
