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
      className="bg-black border border-white/20 rounded-lg p-6 font-cyber"
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
                <code className="bg-white/10 text-white px-2 py-1 rounded text-sm font-mono block">{children}</code>
              );
            },
            pre: ({children}) => (
              <pre className="bg-black border border-white/20 p-4 rounded-lg overflow-x-auto mb-4">
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
            <span>Share this post</span>
            <div className="flex gap-2">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300">
                Twitter
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
