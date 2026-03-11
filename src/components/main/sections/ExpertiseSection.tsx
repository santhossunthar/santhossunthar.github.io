'use client'

import { expertiseContent } from '../../../data/sectionContent';

export const ExpertiseSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100 text-center lg:text-left">{expertiseContent.title}</h4>
      <div className="flex justify-center lg:justify-start">
        <ul className="space-y-3 text-cyber-300 flex flex-col">
          {expertiseContent.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 w-full max-w-md">
              <span className="w-2 h-2 bg-cyber-400 rounded-full flex-shrink-0 mt-2"></span>
              <span className="text-cyber-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
