'use client'

import { interestsContent } from '../../../data/constants';

export const InterestsSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100 text-center lg:text-left">{interestsContent.title}</h4>
      <p className="text-base leading-relaxed text-cyber-300 text-justify">{interestsContent.description}</p>
      <div className="flex flex-wrap justify-evenly gap-y-3 mt-4">
        {interestsContent.tags.map((interest) => (
          <span
            key={interest}
            className="px-3 py-1.5 bg-cyber-800/50 border border-cyber-400/30 rounded-full text-cyber-200 text-xs hover:bg-cyber-700/50 transition-colors duration-300"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};
