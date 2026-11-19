'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gallery } from '@/content/gallery';
import PhotoSlot from '../PhotoSlot';
import Pill from '../Pill';

/** Horizontal, swipeable strip of moments with snap scrolling and arrow controls. */
export default function MomentsStrip() {
  const track = useRef<HTMLUListElement>(null);
  const go = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.7, behavior: 'smooth' });
  const widths = { portrait: 'w-[70vw] sm:w-[340px] aspect-[3/4]', landscape: 'w-[85vw] sm:w-[520px] aspect-[4/3]', square: 'w-[75vw] sm:w-[400px] aspect-square' } as const;

  return (
    <section aria-labelledby="moments-title" className="section overflow-hidden bg-paper">
      <div className="container-site flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Pill>Chapter 06 · Moments</Pill>
          <h2 id="moments-title" className="mt-5 text-h2">Moments <span className="italic text-bronze-deep">with my people</span></h2>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous moments" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next moments" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"><ArrowRight className="h-5 w-5" /></button>
          <Link href="/gallery/" className="link-underline ml-3 text-sm">All moments</Link>
        </div>
      </div>
      <ul
        ref={track}
        className="mt-12 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Moments, scroll horizontally"
      >
        {gallery.map((g, i) => (
          <li key={i} className="shrink-0 snap-start">
            <figure className="group">
              <div className="overflow-hidden">
                <PhotoSlot photo={g} tone={i % 3 === 1 ? 'dark' : 'light'} zoom className={widths[g.aspect ?? 'landscape']} sizes="520px" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm">
                <span className="truncate">{g.alt}</span>
                <span className="shrink-0 text-xs uppercase tracking-wider text-stone">{g.category.split(' ')[0]}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
