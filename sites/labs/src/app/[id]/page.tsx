import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostMobileNavbar from '@/components/blog/BlogPostMobileNavbar';
import Breadcrumb from '@/components/blog/Breadcrumb';
import LabDetail from '@/components/labs/LabDetail';
import LabRightSidebar from '@/components/labs/LabRightSidebar';
import LabSidebar from '@/components/labs/LabSidebar';
import { getAllLabs, getLabBySlug } from '@/lib/lab/lab-utils';
import { extractTableOfContents, stripFirstH1 } from '@/lib/shared/table-of-contents';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllLabs().map((lab) => ({
    id: lab.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lab = getLabBySlug(id);

  if (!lab) {
    return {
      title: 'Lab Not Found',
    };
  }

  return {
    title: `${lab.title} CTF Lab - CTF Labs`,
    description: lab.excerpt,
    alternates: {
      canonical: `/${lab.slug}/`,
    },
    openGraph: {
      title: `${lab.title} CTF Lab`,
      description: lab.excerpt,
      type: 'article',
      publishedTime: lab.date,
      authors: [lab.author],
      tags: lab.tags,
    },
  };
}

export default async function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lab = getLabBySlug(id);

  if (!lab) {
    notFound();
  }

  const allLabs = getAllLabs();
  const tableOfContents = extractTableOfContents(stripFirstH1(lab.content));

  return (
    <div className="blog-page min-h-screen bg-black">
      <div className="lg:hidden">
        <BlogPostMobileNavbar postTitle={lab.title} backHref="/" backLabel="Back to labs" homeHref="/" homeLabel="Go to labs" />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <LabSidebar currentView="labs" />
          </div>

          <div className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[
                { label: 'Labs', path: '/' },
                { label: lab.title },
              ]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <div className="relative z-0">
              <LabDetail lab={lab} />
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <LabRightSidebar labs={allLabs} tableOfContents={tableOfContents} />
          </div>
        </div>
      </div>
    </div>
  );
}
