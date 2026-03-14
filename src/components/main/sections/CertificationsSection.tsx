import Image from 'next/image';
import { certificationsContent } from '../../../data/constants';

interface CertificationItemProps {
  item: {
    name: string;
    fullName: string;
    issuer: string;
    issuedDate: string;
    logo: string;
    bgImage: string;
    bgFlipHorizontal?: boolean;
    bgScale?: number;
    bgPosition?: string;
    verifyUrl: string;
  };
}

const CertificationItem = ({ item }: CertificationItemProps) => {
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
            className="object-cover blur-sm"
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

      <div className="relative z-10 h-full w-full p-4 md:p-5">
        <div className="flex items-center gap-4 w-full h-full">
          <div className="w-24 md:w-28 shrink-0">
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={800}
            height={320}
            className="w-full h-20 md:h-24 rounded-md bg-black/35 object-contain p-2"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          </div>
          <div className="flex-1 text-left flex flex-col">
            <p className="text-cyber-300 mt-1">{item.fullName}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-sm text-cyber-400">{`Issuer: ${item.issuer}`}</p>
                  <p className="text-sm text-cyber-400">{`Issued: ${item.issuedDate}`}</p>
                </div>
                <a
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Verify
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CertificationsSection = () => {
  return (
    <div className="w-full space-y-5">
      <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center">
        {certificationsContent.title}
      </h4>
      <div className="grid grid-cols-1 grid-rows-2 gap-0 w-full">
        {certificationsContent.items.map((item) => (
          <CertificationItem
            key={item.name}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
