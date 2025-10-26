'use client'

import { TypewriterText } from '../../shared/TypewriterText';
import { aboutContent, animationTiming } from '../../../data/sectionContent';

export const AboutSection = () => {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed">
        <TypewriterText 
          text={aboutContent.paragraphs[0]}
          delay={animationTiming.titleDelay}
          className="text-cyber-200"
        />
      </p>
      
      <p className="text-base leading-relaxed">
        <TypewriterText 
          text={aboutContent.paragraphs[1]}
          delay={animationTiming.titleDelay + animationTiming.itemDelay}
          className="text-cyber-200"
        />
      </p>
    </div>
  );
};
