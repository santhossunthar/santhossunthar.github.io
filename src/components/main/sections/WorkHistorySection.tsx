import Image from 'next/image';
import { workHistoryContent } from '../../../data/constants';

interface WorkHistoryItemProps {
  item: {
    name: string;
    fullName: string;
    location: string;
    startDate: string;
    endDate: string;
    logo: string;
    bgImage: string;
    bgFlipHorizontal?: boolean;
    bgScale?: number;
    bgPosition?: string;
  };
}

const WorkHistoryItem = ({ item }: WorkHistoryItemProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg min-h-[150px] md:min-h-[170px]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          }}
        >
          <Image
            src={item.bgImage}
            alt={`${item.name} background`}
            fill
            className="object-cover"
            style={{
              objectPosition: item.bgPosition ?? 'center',
              transform: item.bgFlipHorizontal
                ? `scaleX(-1) scale(${item.bgScale ?? 1.05})`
                : `scale(${item.bgScale ?? 1.05})`,
            }}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 h-full w-full p-4 md:p-2">
        <div className="flex items-center gap-4 w-full h-full">
          <div className="relative z-10 p-5 md:p-3 space-y-2">
            <h5 className="text-xl md:text-2xl font-semibold text-cyber-100">{item.fullName}</h5>
            <p className="text-base md:text-lg leading-relaxed text-cyber-200">{item.location}</p>
            <p className="text-sm md:text-base leading-relaxed text-cyber-300/95">
              {`${item.startDate} - ${item.endDate}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkHistorySection = () => {
  return (
    <div className="w-full space-y-5">
      <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center">
        {workHistoryContent.title}
      </h4>
      <div className="grid grid-cols-1 grid-rows-2 gap-0 w-full">
        {workHistoryContent.items.map((item) => (
          <WorkHistoryItem
            key={item.name}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};