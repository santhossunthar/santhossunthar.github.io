'use client'

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ 
  text, 
  speed = 30, 
  delay = 0, 
  className = '', 
  onComplete 
}: TypewriterTextProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a delay to simulate scroll-triggered effect
    const timeoutId = setTimeout(() => {
      setShowText(true);
      if (onComplete) {
        onComplete();
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, onComplete]);

  return (
    <span className={className}>
      {showText ? text : ''}
    </span>
  );
};
