import type { Metadata } from 'next';
import Breadcrumb from '@/components/blog/Breadcrumb';
import LabList from '@/components/labs/LabList';
import LabMobileMenu from '@/components/labs/LabMobileMenu';
import LabRightSidebar from '@/components/labs/LabRightSidebar';
import LabSidebar from '@/components/labs/LabSidebar';
import { getAllLabs } from '@/lib/lab/lab-utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'CTF Labs',
    description: 'Self-hosted CTF labs',
    alternates: {
      canonical: '/labs/',
    },
  };
}

export default function LabsPage() {
  const labs = getAllLabs();

  return (
    <div className="blog-page min-h-screen bg-black">
      <LabMobileMenu title="CTF Labs" currentView="labs" />

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <LabSidebar currentView="labs" />
          </div>

          <div className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[{ label: 'Labs' }]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <div className="relative z-0">
              <LabList labs={labs} />
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col sticky top-0 h-screen">
            <LabRightSidebar labs={labs} />
          </div>
        </div>
      </div>
    </div>
  );
}
