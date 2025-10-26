'use client'

import { useState, useEffect } from 'react';
import { TypewriterText } from '../../shared/TypewriterText';
import { interestsContent, animationTiming } from '../../../data/sectionContent';

interface AnimatedTagProps {
  text: string;
  delay: number;
}

const AnimatedTag = ({ text, delay }: AnimatedTagProps) => {
  const [showTag, setShowTag] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowTag(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <>
      {showTag && (
        <span className="px-3 py-1.5 bg-cyber-800/50 border border-cyber-400/30 rounded-full text-cyber-200 text-xs hover:bg-cyber-700/50 transition-colors duration-300">
          {text}
        </span>
      )}
    </>
  );
};

export const InterestsSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100">
        <TypewriterText 
          text={interestsContent.title} 
          delay={animationTiming.titleDelay}
          className="text-cyber-100"
        />
      </h4>
      <p className="text-base leading-relaxed text-cyber-300">
        <TypewriterText 
          text={interestsContent.description}
          delay={animationTiming.itemDelay}
          className="text-cyber-300"
        />
      </p>
      <div className="flex flex-wrap justify-evenly gap-y-3 mt-4">
        {interestsContent.tags.map((interest, index) => (
          <AnimatedTag
            key={interest}
            text={interest}
            delay={animationTiming.itemDelay + animationTiming.itemInterval + (index * animationTiming.tagInterval)}
          />
        ))}
      </div>
    </div>
  );
};
