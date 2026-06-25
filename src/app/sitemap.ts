import { MetadataRoute } from 'next';
import { METADATA_BASE_URL } from '@/lib/app-config';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = METADATA_BASE_URL.toString().replace(/\/$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1    },
    { url: `${baseUrl}/blog`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/privacy-policy`,      lastModified: new Date('2024-06-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms-and-conditions`,lastModified: new Date('2024-06-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/security-and-trust`,  lastModified: new Date('2024-06-01'), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
