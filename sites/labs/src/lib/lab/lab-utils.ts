let fs: typeof import('fs') | undefined;
let path: typeof import('path') | undefined;
let matter: (typeof import('gray-matter')) | undefined;

if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
}

export interface Lab {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  difficulty: string;
  status: string;
  platform: string;
  tags: string[];
  estimatedTime: string;
  author: string;
  featured: boolean;
  repository: string;
  content: string;
  excerpt: string;
}

const labsDirectory = typeof window === 'undefined'
  ? path?.join(process.cwd(), 'src/data/labs') ?? ''
  : '';

export function getAllLabIds(): string[] {
  if (typeof window !== 'undefined') {
    return [];
  }

  try {
    if (!fs) {
      return [];
    }

    return fs.readdirSync(labsDirectory).map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading lab IDs:', error);
    return [];
  }
}

export function getLabData(id: string): Lab | null {
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    if (!fs || !path || !matter) {
      return null;
    }

    const fullPath = path.join(labsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      slug: data.slug ?? id,
      title: data.title,
      date: data.date,
      category: data.category,
      difficulty: data.difficulty,
      status: data.status,
      platform: data.platform,
      tags: data.tags,
      estimatedTime: data.estimatedTime,
      author: data.author,
      featured: data.featured,
      repository: data.repository,
      content,
      excerpt: data.excerpt,
    };
  } catch (error) {
    console.error('Error reading lab:', error);
    return null;
  }
}

export function getLabBySlug(slug: string): Lab | null {
  const ids = getAllLabIds();

  for (const id of ids) {
    const lab = getLabData(id);
    if (lab?.slug === slug) {
      return lab;
    }
  }

  return null;
}

export function getAllLabs(): Lab[] {
  if (typeof window !== 'undefined') {
    return [];
  }

  return getAllLabIds()
    .map((id) => getLabData(id))
    .filter((lab): lab is Lab => lab !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
