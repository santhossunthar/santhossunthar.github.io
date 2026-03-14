
import { expertiseContent } from '../../../data/constants';

export const ExpertiseSection = () => {
  return (
    <div className="w-full space-y-5">
      <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center">
        {expertiseContent.title}
      </h4>
      <div className="w-full">
        <ul className="space-y-3 text-cyber-300 flex flex-col">
          {expertiseContent.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 w-full">
              <span className="text-cyber-400 mt-0.5 text-sm md:text-base">{'>'}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
