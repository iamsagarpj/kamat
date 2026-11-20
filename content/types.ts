/**
 * Content model. Every entry carries a `verified` flag so unconfirmed
 * material can sit in the files without ever appearing on the live site.
 */

export type Photo = {
  /** Path under /public, e.g. "/assets/profile/portrait.webp". Leave undefined until an approved photo exists. */
  src?: string;
  alt: string;
  /** Shown on the placeholder until the real photo is added. */
  placeholderLabel?: string;
  width?: number;
  height?: number;
  /** Responsive sources, e.g. '/a-480.webp 480w, /a-768.webp 768w'. */
  srcSet?: string;
  /** CSS object-position for the crop, e.g. 'center 15%'. */
  position?: string;
};

export type Business = {
  slug: string;
  name: string;
  role: string;
  since?: string;
  location?: string;
  category: string;
  summary: string;
  overview: string[];
  services: string[];
  vision?: string;
  logo?: Photo;
  cover: Photo;
  enquiryEmail?: string;
  featured?: boolean;
  verified: boolean;
};

export type ProjectStatus = 'Ongoing' | 'Completed';

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  status: ProjectStatus;
  businessSlug: string;
  description: string[];
  completionDate?: string;
  cover: Photo;
  photos: Photo[];
  verified: boolean;
};

export type Activity = {
  date: string; // ISO yyyy-mm-dd
  title: string;
  summary: string;
  theme: 'Public Service' | 'Education' | 'Community' | 'Youth & Sports' | 'Co-operative Sector' | 'Faith & Culture';
  place?: string;
  sourceUrl: string;
  photo?: Photo;
  verified: boolean;
};

export type GalleryCategory =
  | 'Business & Construction'
  | 'Leadership & Meetings'
  | 'Events & Public Appearances'
  | 'Community Activities'
  | 'Personal Moments';

export type GalleryItem = Photo & {
  category: GalleryCategory;
  caption?: string;
  /** Visual rhythm for the masonry grid while using placeholders. */
  aspect?: 'portrait' | 'landscape' | 'square';
};
