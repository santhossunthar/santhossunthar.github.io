'use client'

import { useState, useEffect } from 'react';
import { TypewriterText } from '../../shared/TypewriterText';
import { educationContent, animationTiming } from '../../../data/sectionContent';

interface AnimatedEducationItemProps {
  item: {
    degree: string;
    institution: string;
    status: string;
  };
  delay: number;
}

const AnimatedEducationItem = ({ item, delay }: AnimatedEducationItemProps) => {
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowItem(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <>
      {showItem && (
        <div className="bg-cyber-800/30 border border-cyber-400/20 rounded-lg p-4">
          <h5 className="text-lg font-semibold text-cyber-100">
            <TypewriterText 
              text={item.degree} 
              delay={0}
              className="text-cyber-100"
            />
          </h5>
          <p className="text-cyber-300">
            <TypewriterText 
              text={item.institution} 
              delay={animationTiming.itemInterval}
              className="text-cyber-300"
            />
          </p>
          <p className="text-sm text-cyber-400 mt-2">
            <TypewriterText 
              text={item.status} 
              delay={animationTiming.itemInterval * 2}
              className="text-cyber-400"
            />
          </p>
        </div>
      )}
    </>
  );
};

export const EducationSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100">
        <TypewriterText 
          text={educationContent.title} 
          delay={animationTiming.titleDelay}
          className="text-cyber-100"
        />
      </h4>
      <div className="space-y-3">
        {educationContent.items.map((item, index) => (
          <AnimatedEducationItem
            key={index}
            item={item}
            delay={animationTiming.itemDelay + (index * animationTiming.itemInterval)}
          />
        ))}
      </div>
    </div>
  );
};
