import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { localePath } from '@/content/i18n';
import { liveBusinesses } from '@/content/businesses';
import { liveProjects } from '@/content/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ['/', '/about/', '/ventures/', '/projects/', '/public-life/', '/gallery/', '/media/', '/contact/',
    ...liveBusinesses.map((b) => `/ventures/${b.slug}/`),
    ...liveProjects.map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((p) =>
    (['en', 'mr'] as const).map((lang) => ({
      url: `${site.url}${localePath(lang, p)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p === '/' ? 1 : 0.7,
      alternates: { languages: { 'en-IN': `${site.url}${localePath('en', p)}`, 'mr-IN': `${site.url}${localePath('mr', p)}` } },
    })),
  );
}
