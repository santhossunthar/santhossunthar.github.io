'use client'

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/lib/blog-utils';
import { extractTableOfContents, TableOfContentsItem } from '@/lib/table-of-contents';

interface BlogPostDetailProps {
  post: BlogPost;
  onTableOfContentsChange?: (toc: TableOfContentsItem[]) => void;
}

export default function BlogPostDetail({ post, onTableOfContentsChange }: BlogPostDetailProps) {

  // Function to strip the first H1 from markdown content
  const stripFirstH1 = (content: string) => {
    // Remove the first H1 heading (lines starting with #)
    const lines = content.split('\n');
    let foundFirstH1 = false;
    const filteredLines = lines.filter(line => {
      if (!foundFirstH1 && line.trim().startsWith('# ')) {
        foundFirstH1 = true;
        return false; // Skip this line
      }
      return true;
    });
    return filteredLines.join('\n');
  };

  useEffect(() => {
    // Extract table of contents and notify parent
    if (post && onTableOfContentsChange) {
      const toc = extractTableOfContents(post.content);
      onTableOfContentsChange(toc);
    }
  }, [post, onTableOfContentsChange]);


  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black border border-white/20 rounded-lg p-4 md:p-6 font-cyber"
    >
      {/* Post Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {post.featured && (
            <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
              Featured
            </span>
          )}
          <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-white/70 text-sm mb-6">
          <div className="flex items-center gap-4">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
              return <h1 id={id} className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>;
            },
            h2: ({children}) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
              return <h2 id={id} className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>;
            },
            h3: ({children}) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
              return <h3 id={id} className="text-xl font-bold text-white mb-3 mt-4">{children}</h3>;
            },
            h4: ({children}) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
              return <h4 id={id} className="text-lg font-bold text-white mb-2 mt-3">{children}</h4>;
            },
            p: ({children}) => <p className="text-white/90 mb-4 leading-relaxed">{children}</p>,
            ul: ({children}) => <ul className="text-white/90 mb-4 ml-6 list-disc">{children}</ul>,
            ol: ({children}) => <ol className="text-white/90 mb-4 ml-6 list-decimal">{children}</ol>,
            li: ({children}) => <li className="mb-2">{children}</li>,
            code: ({children, className}) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-white/10 text-white px-2 py-1 rounded text-sm font-mono">{children}</code>
              ) : (
                <code className="text-white text-sm font-mono block">{children}</code>
              );
            },
            pre: ({children}) => (
              <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/80 mb-4">
                {children}
              </blockquote>
            ),
            table: ({children}) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-white/20 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            th: ({children}) => (
              <th className="border border-white/20 px-4 py-2 bg-white/10 text-white font-bold">
                {children}
              </th>
            ),
            td: ({children}) => (
              <td className="border border-white/20 px-4 py-2 text-white/90">
                {children}
              </td>
            ),
            a: ({children, href}) => (
              <a 
                href={href} 
                className="text-white hover:text-white/80 underline transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
            em: ({children}) => <em className="italic text-white/90">{children}</em>
          }}
        >
          {stripFirstH1(post.content)}
        </ReactMarkdown>
      </div>

      {/* Post Footer */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span>Share</span>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(`Check out this article: ${post.title}`);
                  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                title="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button 
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const title = encodeURIComponent(post.title);
                  const summary = encodeURIComponent(post.excerpt);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                title="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
