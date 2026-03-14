import { aboutContent } from '../../../data/constants';
import Image from 'next/image';
import { mainSectionConfig } from '@/data/constants';

export const AboutSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center lg:text-left">{mainSectionConfig.profile.name}</h3>
        <div className="lg:hidden">
          <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-md bg-black/30">
            <Image
              src={mainSectionConfig.profile.imageSrc}
              alt={mainSectionConfig.profile.imageAlt}
              fill
              className="object-contain object-center"
              sizes="100vw"
            />
          </div>
        </div>
        <p className="text-lg leading-relaxed text-justify">
          {aboutContent.paragraphs[0]}
        </p>

        <p className="text-lg leading-relaxed text-justify">
          {aboutContent.paragraphs[1]}
        </p>
      </div>

      <aside className="hidden lg:block w-full">
        <div className="mx-auto max-w-xs lg:max-w-none p-1">
          <div className="relative mx-auto w-36 h-56 md:w-44 md:h-72 overflow-hidden rounded-md">
            <Image
              src={mainSectionConfig.profile.imageSrc}
              alt={mainSectionConfig.profile.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 176px, 220px"
            />
          </div>
        </div>
      </aside>
    </div>
  );
};
