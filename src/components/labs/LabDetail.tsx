import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';
import { Lab } from '@/lib/lab/lab-utils';
import { stripFirstH1 } from '@/lib/shared/table-of-contents';

interface LabDetailProps {
  lab: Lab;
}

const toHeadingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export default function LabDetail({ lab }: LabDetailProps) {
  const renderedContent = stripFirstH1(lab.content);

  return (
    <article className="bg-black border border-white/20 rounded-lg p-4 md:p-6 font-cyber">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {lab.featured && (
            <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">Featured</span>
          )}
          <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">{lab.category}</span>
          <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">{lab.status}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{lab.title}</h1>
        <p className="text-white/80 text-sm leading-relaxed mb-5">{lab.excerpt}</p>

        <div className="grid gap-3 sm:grid-cols-3 text-white/75 text-sm mb-5">
          <div className="border border-white/20 rounded-lg p-3 bg-white/5">
            <span className="block text-white/50 text-xs mb-1">Difficulty</span>
            <span>{lab.difficulty}</span>
          </div>
          <div className="border border-white/20 rounded-lg p-3 bg-white/5">
            <span className="block text-white/50 text-xs mb-1">Platform</span>
            <span>{lab.platform}</span>
          </div>
          <div className="border border-white/20 rounded-lg p-3 bg-white/5">
            <span className="block text-white/50 text-xs mb-1">Time</span>
            <span>{lab.estimatedTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {lab.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={lab.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20 transition-colors duration-300"
          >
            <ExternalLink className="h-4 w-4" />
            Repository
          </a>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => {
              const id = toHeadingId(String(children));
              return <h1 id={id} className="scroll-mt-24 text-3xl font-bold text-white mb-6 mt-8">{children}</h1>;
            },
            h2: ({ children }) => {
              const id = toHeadingId(String(children));
              return <h2 id={id} className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">{children}</h2>;
            },
            h3: ({ children }) => {
              const id = toHeadingId(String(children));
              return <h3 id={id} className="scroll-mt-24 text-xl font-bold text-white mb-3 mt-4">{children}</h3>;
            },
            h4: ({ children }) => {
              const id = toHeadingId(String(children));
              return <h4 id={id} className="scroll-mt-24 text-lg font-bold text-white mb-2 mt-3">{children}</h4>;
            },
            p: ({ children }) => <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="text-white/90 text-[0.95rem] mb-4 ml-6 list-disc">{children}</ul>,
            ol: ({ children }) => <ol className="text-white/90 text-[0.95rem] mb-4 ml-6 list-decimal">{children}</ol>,
            li: ({ children }) => <li className="mb-2 text-[0.95rem]">{children}</li>,
            code: ({ children, className }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-white/10 text-white px-2 py-1 rounded text-sm font-mono">{children}</code>
              ) : (
                <code className="text-white text-sm font-mono block">{children}</code>
              );
            },
            pre: ({ children }) => <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/80 mb-4">{children}</blockquote>,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-white/20 rounded-lg">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="border border-white/20 px-4 py-2 bg-white/10 text-white font-bold">{children}</th>,
            td: ({ children }) => <td className="border border-white/20 px-4 py-2 text-white/90">{children}</td>,
            a: ({ children, href }) => (
              <a href={href} className="text-white hover:text-white/80 underline transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <figure className="my-6">
                <img
                  src={src ?? ''}
                  alt={alt ?? ''}
                  loading="lazy"
                  className="w-full rounded-lg border border-white/20 bg-white/5 object-contain"
                />
                {alt && <figcaption className="mt-2 text-center text-xs text-white/55">{alt}</figcaption>}
              </figure>
            ),
            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
            em: ({ children }) => <em className="italic text-white/90">{children}</em>,
          }}
        >
          {renderedContent}
        </ReactMarkdown>
      </div>
    </article>
  );
}
