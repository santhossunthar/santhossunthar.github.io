import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog-utils';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/blog/'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog/tags/'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.shortId}/`),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.7,
  }));

  const tagRoutes = getAllTags().map((tag) => {
    const slug = slugifyTag(tag);
    const latestTaggedPost = posts.find((post) =>
      post.tags.some((postTag) => slugifyTag(postTag) === slug)
    );

    return {
      url: absoluteUrl(`/blog/tags/${slug}/`),
      lastModified: latestTaggedPost?.date ? new Date(latestTaggedPost.date) : latestPostDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    };
  });

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
