export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export function stripFirstH1(content: string): string {
  const lines = content.split('\n');
  let removed = false;

  return lines
    .filter((line) => {
      if (!removed && line.trim().startsWith('# ')) {
        removed = true;
        return false;
      }

      return true;
    })
    .join('\n');
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    headings.push({
      id,
      text,
      level
    });
  }

  return headings;
}

export function scrollToHeading(headingId: string) {
  const element = document.getElementById(headingId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
