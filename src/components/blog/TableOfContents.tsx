'use client'

import { TableOfContentsItem, scrollToHeading } from '@/lib/table-of-contents';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const handleHeadingClick = (headingId: string) => {
    scrollToHeading(headingId);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-bold text-white mb-3">Contents</h3>
      {!items || items.length === 0 ? (
        <p className="text-white/60 text-xs">No headings found in this post</p>
      ) : (
        <nav className="space-y-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleHeadingClick(item.id)}
              className={`block w-full text-left text-xs text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors duration-200 ${
                item.level === 1 ? 'font-semibold' : 
                item.level === 2 ? 'ml-2' : 
                item.level === 3 ? 'ml-4' : 
                item.level === 4 ? 'ml-6' : 
                'ml-8'
              }`}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}