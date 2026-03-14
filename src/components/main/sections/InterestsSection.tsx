
import { interestsContent } from '../../../data/constants';

export const InterestsSection = () => {
  return (
    <div className="w-full space-y-5">
      <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center">
        {interestsContent.title}
      </h4>
      <div className="w-full space-y-4">
        <p className="text-base leading-relaxed text-cyber-300 text-justify">
          {interestsContent.description}
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {interestsContent.tags.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 bg-cyber-800/50 rounded-full text-cyber-200 text-xs md:text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
