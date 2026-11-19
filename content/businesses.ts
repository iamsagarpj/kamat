import type { Business } from './types';

/**
 * Business ventures. Add a new object to this array to create a new venture
 * card and its detail page at /ventures/<slug>/. Set `verified: false` to hide
 * an entry until it's confirmed.
 */
export const businesses: Business[] = [
  {
    slug: 'vijaya-construction',
    name: 'Vijaya Construction',
    role: 'Owner & CEO',
    since: 'March 2023',
    location: 'Khed, Satara',
    category: 'Government contractors, builders & developers',
    summary:
      'A Satara-based construction firm working as a government contractor and as builders and developers.',
    overview: [
      'Kamesh Kamble founded and has led Vijaya Construction since March 2023, operating from Khed, Satara.',
      'The firm works across government contracting and private building and development.',
    ],
    // TODO: replace with the client's confirmed service list
    services: ['Government contract works', 'Building construction', 'Property development'],
    vision: undefined, // TODO: business vision in the client's words
    cover: { alt: 'Vijaya Construction site', placeholderLabel: 'Construction site photograph' },
    featured: true,
    verified: true,
  },
  // Example for a future venture (kept unverified so it never renders):
  // {
  //   slug: 'new-venture', name: 'New Venture', role: 'Founder', category: '...',
  //   summary: '...', overview: ['...'], services: [], cover: { alt: '...' }, verified: false,
  // },
];

export const liveBusinesses = businesses.filter((b) => b.verified);
export const getBusiness = (slug: string) => liveBusinesses.find((b) => b.slug === slug);
