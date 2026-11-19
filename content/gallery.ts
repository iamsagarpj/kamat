import type { GalleryCategory, GalleryItem } from './types';

export const galleryCategories: GalleryCategory[] = [
  'Business & Construction',
  'Leadership & Meetings',
  'Events & Public Appearances',
  'Community Activities',
  'Personal Moments',
];

/**
 * Gallery items. Each slot currently has no `src`, so a labelled placeholder
 * shows. Drop approved images into /public/assets/gallery/ and set `src`.
 */
export const gallery: GalleryItem[] = [
  { category: 'Events & Public Appearances', aspect: 'portrait', alt: 'Student Day programme, Pratapsinh High School', placeholderLabel: 'Student Day · Nov 2026' },
  { category: 'Community Activities', aspect: 'landscape', alt: 'Meeting residents at Vikasnagar', placeholderLabel: 'Vikasnagar visit · Nov 2026' },
  { category: 'Business & Construction', aspect: 'landscape', alt: 'Vijaya Construction work site', placeholderLabel: 'Site photograph' },
  { category: 'Events & Public Appearances', aspect: 'square', alt: 'Turf cricket night final and prize distribution', placeholderLabel: 'Turf cricket final · Jun 2026' },
  { category: 'Leadership & Meetings', aspect: 'portrait', alt: 'Satara DCC Bank election', placeholderLabel: 'DCC Bank election · Nov 2026' },
  { category: 'Business & Construction', aspect: 'portrait', alt: 'Construction team at work', placeholderLabel: 'Team on site' },
  { category: 'Leadership & Meetings', aspect: 'landscape', alt: 'Zilla Parishad meeting', placeholderLabel: 'ZP meeting' },
  { category: 'Personal Moments', aspect: 'square', alt: 'Darshan at Shri Kshetra Adamapur', placeholderLabel: 'Adamapur · Nov 2026' },
  { category: 'Community Activities', aspect: 'portrait', alt: 'Community programme in Khed', placeholderLabel: 'Community programme' },
];
