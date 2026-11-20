'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import type { GalleryItem } from '@/content/types';
import PhotoSlot from './PhotoSlot';
import { getContent, type Lang } from '@/content/i18n';

const aspectClass = { portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]', square: 'aspect-square' } as const;

/**
 * Masonry gallery with category filter and an accessible lightbox
 * (Esc to close, arrow keys to move, focus returns to the opener).
 * Reused for the main gallery and for project photo sets.
 */
export default function ProjectGallery({ items, categories, lang = 'en' }: { items: GalleryItem[]; categories?: string[]; lang?: Lang }) {
  const { ui, categoryLabel } = getContent(lang);
  const [filter, setFilter] = useState<string>('All');
  const [active, setActive] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  const shown = useMemo(() => (filter === 'All' ? items : items.filter((i) => i.category === filter)), [items, filter]);

  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);
  const step = useCallback((d: number) => setActive((a) => (a === null ? a : (a + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  const current = active !== null ? shown[active] : null;

  return (
    <div>
      {categories && (
        <div role="group" aria-label={ui.gallery.filterAria} className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-[44px] shrink-0 whitespace-nowrap border px-4 text-sm font-medium transition-colors ${
                filter === c ? 'border-ink bg-ink text-paper' : 'border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink'
              }`}
            >
              {c === 'All' ? ui.gallery.all : categoryLabel(c)}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {shown.map((item, i) => (
          <li key={`${filter}-${item.alt}-${i}`} className="break-inside-avoid animate-[fadein_0.5s_ease-out_both] motion-reduce:animate-none">
            <button
              type="button"
              className="group relative block w-full overflow-hidden text-left"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`${ui.gallery.open}: ${item.alt}`}
            >
              <PhotoSlot photo={item} tone={i % 3 === 1 ? 'dark' : 'light'} zoom className={`w-full ${aspectClass[item.aspect ?? 'landscape']}`} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-ink/80 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                <Expand className="h-4 w-4" />
              </span>
            </button>
            <p className="mt-2 text-xs uppercase tracking-wider text-stone">{categoryLabel(item.category)}</p>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 p-4 backdrop-blur sm:p-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between text-paper">
              <p className="text-sm text-paper/70">{(active ?? 0) + 1} / {shown.length}</p>
              <button ref={closeRef} type="button" onClick={close} aria-label={ui.gallery.close} className="flex h-11 w-11 items-center justify-center hover:text-bronze-light">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center py-4" onClick={(e) => e.target === e.currentTarget && close()}>
              <motion.div key={active} initial={reduce ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className="w-full max-w-4xl">
                <PhotoSlot photo={current} className={`mx-auto max-h-[70vh] w-full ${aspectClass[current.aspect ?? 'landscape']}`} sizes="90vw" />
                <p className="mt-4 text-center text-paper/80">{current.caption ?? current.alt}</p>
              </motion.div>
              {shown.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={ui.gallery.prev} className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/70 text-paper hover:text-bronze-light">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={ui.gallery.next} className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/70 text-paper hover:text-bronze-light">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
