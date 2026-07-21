import { AboutSection } from './sections/AboutSection';
import { WorkHistorySection } from './sections/WorkHistorySection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { InterestsSection } from './sections/InterestsSection';
import { GithubStatsSection } from './sections/GithubStatsSection';

export const AboutMeSection = () => {
  return (
    <div className="about-me-section space-y-0 px-1 py-4 text-cyber-200">
      <section id="about" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <AboutSection />
        </div>
      </section>

      <section id="work" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <WorkHistorySection />
        </div>
      </section>

      <section id="education" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <EducationSection />
        </div>
      </section>

      <section id="certifications" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <CertificationsSection />
        </div>
      </section>

      <section id="expertise" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <ExpertiseSection />
        </div>
      </section>

      <section id="interests" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto p-4 md:p-6">
          <InterestsSection />
        </div>
      </section>
      {/*}
      <section id="projects" className="w-full">
        <div className="w-full max-w-[46rem] mx-auto bg-cyber-900/20 rounded-xl p-4 md:p-6">
          <GithubStatsSection />
        </div>
      </section>
      */}
    </div>
  );
};
