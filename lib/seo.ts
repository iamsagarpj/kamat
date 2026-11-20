import type { Metadata } from 'next';
import { site, profile, social } from '@/content/site';
import type { Business } from '@/content/types';

export function pageMeta(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${site.url}${opts.path}`;
  const image = opts.image ? `${site.url}${opts.image}` : `${site.url}/og-image.png`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
  };
}

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: profile.name,
  alternateName: [profile.nameMarathi, profile.shortMarathi],
  url: site.url,
  ...(profile.portrait.src ? { image: `${site.url}${profile.portrait.src}` } : {}),
  jobTitle: ['Zilla Parishad Member, Satara', 'Owner & CEO, Vijaya Construction'],
  worksFor: { '@id': `${site.url}/ventures/vijaya-construction/#org` },
  homeLocation: { '@type': 'Place', name: profile.base },
  alumniOf: profile.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.institution })),
  sameAs: [social.instagram.url, social.facebook.url],
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'en-IN',
  publisher: { '@id': `${site.url}/#person` },
});

/** Organization only, no LocalBusiness until a verified address exists. No ratings or reviews. */
export const orgSchema = (b: Business) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/ventures/${b.slug}/#org`,
  name: b.name,
  url: `${site.url}/ventures/${b.slug}/`,
  description: b.summary,
  areaServed: b.location,
  founder: { '@id': `${site.url}/#person` },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});
