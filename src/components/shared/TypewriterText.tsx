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
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      setVisibleText('');

      intervalId = setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          onComplete?.();
        }
      }, Math.max(10, speed));
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [delay, onComplete, speed, text]);

  return (
    <span className={className}>
      {visibleText}
    </span>
  );
};
