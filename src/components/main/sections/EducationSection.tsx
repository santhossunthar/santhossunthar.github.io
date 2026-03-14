import { educationContent } from '../../../data/constants';
import Image from 'next/image';

export const EducationSection = () => {
  return (
    <div className="w-full space-y-5">
      <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center">
        {educationContent.title}
      </h4>
      {educationContent.items.map((item, index) => (
        <div key={index} className="relative w-full overflow-hidden rounded-lg min-h-[190px] md:min-h-[220px]">
          <div className="absolute inset-0">
            <Image
              src="/images/education.jpeg"
              alt="Education background"
              fill
              className="object-cover blur-sm scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>

          <div className="relative z-10 p-5 md:p-6 space-y-2">
            <h5 className="text-xl md:text-2xl font-semibold text-cyber-100">{item.degree}</h5>
            <p className="text-base md:text-lg leading-relaxed text-cyber-200">{item.institution}</p>
            <p className="text-sm md:text-base leading-relaxed text-cyber-300/95">
              {`Duration: ${item.startDate} - ${item.endDate}`}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-cyber-300">{item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
