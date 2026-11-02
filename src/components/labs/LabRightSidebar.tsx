import Link from 'next/link';
import { Lab } from '@/lib/lab/lab-utils';
import { TableOfContentsItem } from '@/lib/shared/table-of-contents';
import TableOfContents from '@/components/blog/TableOfContents';

interface LabRightSidebarProps {
  labs: Lab[];
  tableOfContents?: TableOfContentsItem[];
}

export default function LabRightSidebar({ labs, tableOfContents }: LabRightSidebarProps) {
  const platforms = [...new Set(labs.map((lab) => lab.platform))].sort((a, b) => a.localeCompare(b));

  return (
    <div className="bg-black font-cyber">
      <div className="p-4">
        <h3 className="text-base font-bold text-white mb-3">Lab Platforms</h3>
        <div className="flex flex-wrap gap-1">
          {platforms.map((platform) => (
            <span key={platform} className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs">
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/20">
        <h3 className="text-base font-bold text-white mb-3">Published Labs</h3>
        <div className="space-y-2">
          {labs.map((lab, index) => (
            <div key={lab.id} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/labs/${lab.slug}/`}
                  className="block text-white/80 hover:text-white text-xs font-medium transition-colors duration-300 line-clamp-2"
                >
                  {lab.title}
                </Link>
                <span className="text-white/45 text-xs">{lab.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/20">
        <h3 className="text-base font-bold text-white mb-3">Runner Commands</h3>
        <div className="space-y-2 text-xs text-white/75 font-mono">
          <div className="rounded border border-white/20 bg-white/10 p-2">ctf-labs list</div>
          <div className="rounded border border-white/20 bg-white/10 p-2">ctf-labs pull returndesk</div>
          <div className="rounded border border-white/20 bg-white/10 p-2">ctf-labs up returndesk</div>
        </div>
      </div>

      {tableOfContents && tableOfContents.length > 0 && (
        <div className="border-t border-white/20 bg-black/95 backdrop-blur-sm z-10">
          <div className="p-4">
            <TableOfContents items={tableOfContents} />
          </div>
        </div>
      )}
    </div>
  );
}
