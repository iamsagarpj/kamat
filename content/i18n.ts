/**
 * Bilingual content. English lives at the root URLs (/about/), Marathi under /mr/ (/mr/about/).
 * getContent(lang) returns everything a page needs, already in the right language.
 */
import { profile as profileEn, story as storyEn, nav as navEn, milestones as milestonesEn, focusAreas as focusEn, contact as contactEn } from './site';
import { liveActivities } from './activities';
import { gallery as galleryEn, galleryCategories } from './gallery';
import { liveBusinesses } from './businesses';
import { uiEn, type UI } from './ui-en';
import { uiMr } from './ui-mr';
import { mrProfile, mrStory, mrNav, mrMilestones, mrFocus, mrActivities, mrGallery, mrGalleryCategories, mrBusinesses, mrEnquiryTypes } from './mr';
import type { Activity, Business, GalleryItem } from './types';

export type Lang = 'en' | 'mr';
export const LANGS: Lang[] = ['en', 'mr'];

/** Path in the given language. Paths are always written in their English (root) form. */
export function localePath(lang: Lang, path: string) {
  const clean = path.startsWith('/mr/') ? path.slice(3) : path === '/mr' ? '/' : path;
  return lang === 'mr' ? (clean === '/' ? '/mr/' : `/mr${clean}`) : clean;
}

export function langFromPath(pathname: string | null | undefined): Lang {
  return pathname && (pathname === '/mr' || pathname.startsWith('/mr/')) ? 'mr' : 'en';
}

const toDeva = (s: string) => s.replace(/\d/g, (d) => '०१२३४५६७८९'[Number(d)]);

export function getContent(lang: Lang) {
  const mr = lang === 'mr';
  const ui: UI = mr ? uiMr : uiEn;

  const profile = mr
    ? {
        ...profileEn,
        motto: mrProfile.motto,
        tagline: mrProfile.tagline,
        base: mrProfile.base,
        brand: mrProfile.brand,
        roles: mrProfile.roles,
        values: mrProfile.values,
        portrait: { ...profileEn.portrait, alt: mrProfile.portraitAlt },
        aboutPortrait: { ...profileEn.aboutPortrait, ...mrProfile.aboutPortrait },
      }
    : profileEn;

  const story = mr
    ? {
        ...storyEn,
        ...mrStory,
        roles: storyEn.roles.map((r, i) => ({ ...r, ...mrStory.roles[i], href: localePath('mr', r.href) })),
      }
    : storyEn;

  const nav = navEn.map((n, i) => ({ href: localePath(lang, n.href), label: mr ? mrNav[i] : n.label }));
  const milestones = mr ? mrMilestones : milestonesEn;
  const focusAreas = focusEn.map((f, i) =>
    mr
      ? {
          ...f,
          title: mrFocus[i].title,
          line: mrFocus[i].line,
          href: f.href.startsWith('/') ? localePath('mr', f.href) : f.href,
          photo: { ...f.photo, alt: mrFocus[i].alt, placeholderLabel: mrFocus[i].label },
        }
      : f,
  );

  const activities: Activity[] = liveActivities.map((a) => (mr && mrActivities[a.sourceUrl] ? { ...a, ...mrActivities[a.sourceUrl] } : a));

  const gallery: GalleryItem[] = galleryEn.map((g, i) => (mr ? { ...g, alt: mrGallery[i]?.alt ?? g.alt, placeholderLabel: mrGallery[i]?.label ?? g.placeholderLabel } : g));
  const categoryLabel = (c: string) => (mr ? mrGalleryCategories[c] ?? c : c);

  const businesses: Business[] = liveBusinesses.map((b) => {
    const o = mr ? mrBusinesses[b.slug] : undefined;
    if (!o) return b;
    return {
      ...b,
      ...o,
      cover: { ...b.cover, alt: o.coverAlt ?? b.cover.alt, placeholderLabel: o.coverLabel ?? b.cover.placeholderLabel },
    } as Business;
  });

  const contact = { ...contactEn, region: mr ? mrProfile.base : contactEn.region, enquiryTypes: mr ? mrEnquiryTypes : contactEn.enquiryTypes };

  const formatDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString(mr ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const dayMonth = (iso: string) => {
    const d = new Date(iso + 'T00:00:00');
    return {
      day: mr ? toDeva(String(d.getDate())) : String(d.getDate()),
      month: d.toLocaleString(mr ? 'mr-IN' : 'en-IN', { month: 'short' }),
      year: mr ? toDeva(String(d.getFullYear())) : String(d.getFullYear()),
    };
  };
  const num = (s: string) => (mr ? toDeva(s) : s);
  const href = (path: string) => localePath(lang, path);

  return { lang, ui, profile, story, nav, milestones, focusAreas, activities, gallery, galleryCategories, categoryLabel, businesses, contact, formatDate, dayMonth, num, href };
}

export type Content = ReturnType<typeof getContent>;
