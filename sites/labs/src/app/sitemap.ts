import type { MetadataRoute } from 'next';
import { getAllLabs } from '@/lib/lab/lab-utils';
import { absoluteUrl } from '@/lib/shared/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const labs = getAllLabs();
  const latestLabDate = labs[0]?.date ? new Date(labs[0].date) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: latestLabDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/setup/'),
      lastModified: latestLabDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const labRoutes = labs.map((lab) => ({
    url: absoluteUrl(`/${lab.slug}/`),
    lastModified: new Date(lab.date),
    changeFrequency: 'monthly' as const,
    priority: lab.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...labRoutes];
}
