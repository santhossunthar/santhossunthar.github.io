'use client'

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center font-cyber">
      <ol className="flex items-center space-x-3 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-white/60 mx-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {item.path ? (
              <Link
                href={item.path}
                className="text-white/80 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10 text-xs"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-semibold px-3 py-2 bg-white/10 rounded-lg border border-white/30 text-xs">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
