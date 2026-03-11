'use client'

import Image from 'next/image';
import { certificationsContent } from '../../../data/constants';

interface CertificationItemProps {
  item: {
    name: string;
    fullName: string;
    issuer: string;
    logo: string;
  };
}

const CertificationItem = ({ item }: CertificationItemProps) => {
  return (
    <div className="bg-cyber-800/30 border border-cyber-400/20 rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={800}
            height={320}
            className="w-full h-36 md:h-44 rounded-md border border-cyber-400/30 bg-black/40 object-contain p-2"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex-1 text-center">
          <h5 className="text-lg font-semibold text-cyber-100">{item.name}</h5>
          <p className="text-cyber-300 mt-1">{item.fullName}</p>
          <p className="text-sm text-cyber-400 mt-2">{`Issuer: ${item.issuer}`}</p>
        </div>
      </div>
    </div>
  );
};

export const CertificationsSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-cyber-100 text-center lg:text-left">{certificationsContent.title}</h4>
      <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
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
