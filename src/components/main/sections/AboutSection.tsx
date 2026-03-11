'use client'

import { aboutContent } from '../../../data/constants';

export const AboutSection = () => {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-justify">
        {aboutContent.paragraphs[0]}
      </p>
      
      <p className="text-base leading-relaxed text-justify">
        {aboutContent.paragraphs[1]}
      </p>
    </div>
  );
};
