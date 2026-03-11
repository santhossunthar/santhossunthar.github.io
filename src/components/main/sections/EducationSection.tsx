'use client'

import { educationContent } from '../../../data/sectionContent';

export const EducationSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100 text-center lg:text-left">{educationContent.title}</h4>
      <div className="flex justify-center lg:justify-start">
        <div className="space-y-3 w-full max-w-md lg:max-w-none">
          {educationContent.items.map((item, index) => (
            <div key={index} className="bg-cyber-800/30 border border-cyber-400/20 rounded-lg p-4">
              <h5 className="text-lg font-semibold text-cyber-100">{item.degree}</h5>
              <p className="text-cyber-300 text-justify">{item.institution}</p>
              <p className="text-sm text-cyber-300/90 mt-1 text-justify">
                {`Duration: ${item.startDate} - ${item.endDate}`}
              </p>
              <p className="text-sm text-cyber-400 mt-2 text-justify">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
