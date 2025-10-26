// Only import these on server-side
let fs: any, path: any, matter: any;

if (typeof window === 'undefined') {
  // Server-side only
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
}

export interface BlogPost {
  id: string;
  shortId: string; // Short unique identifier for URLs
  title: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  author: string;
  featured: boolean;
  content: string;
  excerpt: string;
}

// SSG: Read from markdown files (server-side only)
const postsDirectory = typeof window === 'undefined' 
  ? path.join(process.cwd(), 'src/data/blog-posts')
  : '';

// Generate short ID from filename (first 8 characters of filename hash)
function generateShortId(filename: string): string {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(filename).digest('hex');
  return hash.substring(0, 8);
}

export function getAllPostIds(): string[] {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown files
    try {
      if (!fs || !path) {
        console.warn('Server-side modules not available');
        return [];
      }
      
      const fileNames = fs.readdirSync(postsDirectory);
      return fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        return generateShortId(id);
      });
    } catch (error) {
      console.error('Error reading post IDs:', error);
      return [];
    }
  }
  
  // Client-side: Return empty array
  return [];
}

// Get post by short ID
export function getPostByShortId(shortId: string): BlogPost | null {
  if (typeof window === 'undefined') {
    try {
      if (!fs || !path) {
        console.warn('Server-side modules not available');
        return null;
      }
      
      const fileNames = fs.readdirSync(postsDirectory);
      for (const fileName of fileNames) {
        const id = fileName.replace(/\.md$/, '');
        if (generateShortId(id) === shortId) {
          return getPostData(id);
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading post by short ID:', error);
      return null;
    }
  }
  
  return null;
}

export function getPostData(id: string): BlogPost | null {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown file
    try {
      if (!fs || !path || !matter) {
        console.warn('Server-side modules not available');
        return null;
      }
      
      const fullPath = path.join(postsDirectory, `${id}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id,
        shortId: generateShortId(id),
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags,
        readTime: data.readTime,
        author: data.author,
        featured: data.featured,
        content,
        excerpt: data.excerpt
      };
    } catch (error) {
      console.error('Error reading post:', error);
      return null;
    }
  }
  
  // Client-side: Return null
  return null;
}

export function getAllPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown files
    try {
      if (!fs || !path || !matter) {
        console.warn('Server-side modules not available');
        return [];
      }
      
      const fileNames = fs.readdirSync(postsDirectory);
      const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          id,
          shortId: generateShortId(id),
          title: data.title,
          date: data.date,
          category: data.category,
          tags: data.tags,
          readTime: data.readTime,
          author: data.author,
          featured: data.featured,
          content,
          excerpt: data.excerpt
        };
      });
      
      return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error reading posts:', error);
      return [];
    }
  }
  
  // Client-side: Return empty array
  return [];
}

export function getFeaturedPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.featured);
  }
  
  // Client-side: Return empty array
  return [];
}