import Image from 'next/image';
import { workHistoryContent } from '../../../data/constants';

interface WorkHistoryRole {
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
}

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
    roles?: WorkHistoryRole[];
  };
}

const WorkHistoryItem = ({ item }: WorkHistoryItemProps) => {
  const roles = item.roles?.length
    ? item.roles
    : [{ title: item.name, startDate: item.startDate, endDate: item.endDate }];

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-cyber-950/40 p-5 md:p-6">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50" />
        {item.bgImage ? (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${item.bgImage})`,
              backgroundPosition: item.bgPosition ?? 'center',
              backgroundSize: 'cover',
              transform: item.bgFlipHorizontal ? 'scaleX(-1)' : 'none',
              scale: item.bgScale ?? 1.05,
            }}
          />
        ) : null}
      </div>

      <div className="relative z-10 flex gap-4">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h5 className="text-xl md:text-2xl font-semibold text-cyber-100">{item.fullName}</h5>
            <p className="text-base md:text-lg leading-relaxed text-cyber-200">{item.location}</p>
            <p className="text-sm md:text-base leading-relaxed text-cyber-300/95">
              {`${item.startDate} - ${item.endDate}`}
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((role, index) => (
              <div
                key={`${role.title}-${index}`}
                className="flex gap-3"
              >
                <div className="flex flex-col items-center pt-1">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full border border-cyber-400 bg-cyber-500 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]" />
                  {index < roles.length - 1 ? (
                    <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyber-400/70 via-cyber-400/30 to-transparent" />
                  ) : null}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h6 className="text-lg font-medium text-cyber-100">{role.title}</h6>
                    <p className="text-sm text-cyber-300/90">
                      {role.startDate} - {role.endDate}
                    </p>
                  </div>
                  {role.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-cyber-200/95">
                      {role.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
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
      <div className="flex flex-col gap-4 w-full">
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