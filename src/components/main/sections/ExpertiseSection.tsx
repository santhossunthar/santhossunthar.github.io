'use client'

import { useState, useEffect } from 'react';
import { expertiseContent, animationTiming } from '../../../data/sectionContent';

interface AnimatedListItemProps {
  text: string;
  delay: number;
  className?: string;
}

const AnimatedText = ({ text, delay, className = '' }: AnimatedListItemProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowText(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <span className={className}>
      {showText ? text : ''}
    </span>
  );
};

const AnimatedListItem = ({ text, delay, className = '' }: AnimatedListItemProps) => {
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
    <li className="flex items-start gap-3 w-full max-w-md">
      {showItem && (
        <>
          <span className="w-2 h-2 bg-cyber-400 rounded-full flex-shrink-0 mt-2"></span>
          <span className={className}>{text}</span>
        </>
      )}
    </li>
  );
};

export const ExpertiseSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100 text-center lg:text-left">
        <AnimatedText 
          text={expertiseContent.title} 
          delay={animationTiming.titleDelay}
          className="text-cyber-100"
        />
      </h4>
      <div className="flex justify-center lg:justify-start">
        <ul className="space-y-3 text-cyber-300 flex flex-col">
          {expertiseContent.items.map((item, index) => (
            <AnimatedListItem
              key={index}
              text={item}
              delay={animationTiming.itemDelay + (index * animationTiming.itemInterval)}
              className="text-cyber-300"
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
