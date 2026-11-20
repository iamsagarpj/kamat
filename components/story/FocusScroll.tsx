'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getContent, type Lang } from '@/content/i18n';
import PhotoSlot from '../PhotoSlot';
import Pill from '../Pill';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * "Where my attention goes": a pinned horizontal scroll.
 * On desktop the section sticks to the screen and scrolling down slides the
 * numbered cards sideways (inspired by the reference site's "Main Attention").
 * On phones, with reduced motion, or without JS it is a native swipeable row.
 */
export default function FocusScroll({ lang = 'en' }: { lang?: Lang }) {
  const { focusAreas, ui, num } = getContent(lang);
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (min-height: 560px)');
    const measure = () => {
      const can = mq.matches && !reduce;
      setPinned(can);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ['0%', '100%']);
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(Math.min(focusAreas.length - 1, Math.round(p * (focusAreas.length - 1)))));

  return (
    <section
      ref={outer}
      aria-labelledby="focus-title"
      className="relative bg-paper"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16' : 'section overflow-hidden'}>
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Pill>{ui.home.ch3}</Pill>
            <h2 id="focus-title" className="mt-5 text-h2">
              {ui.home.focusTitle[0]} <span className="italic text-bronze-deep">{ui.home.focusTitle[1]}</span> {ui.home.focusTitle[2]}
            </h2>
          </div>
          <div className={`${pinned ? 'flex' : 'hidden'} w-full items-center gap-4 md:w-72`} aria-hidden>
            <span className="font-serif text-2xl tabular-nums">
              {num(String(active + 1).padStart(2, '0'))}
              <span className="text-stone-light"> / {num(String(focusAreas.length).padStart(2, '0'))}</span>
            </span>
            <span className="relative h-px flex-1 bg-ink/15">
              <motion.span className="absolute inset-y-0 left-0 bg-bronze" style={{ width: pinned ? bar : '100%' }} />
            </span>
          </div>
        </div>

        <motion.ul
          ref={track}
          style={pinned ? { x } : undefined}
          className={`mt-6 flex gap-5 lg:mt-10 px-5 sm:px-8 md:gap-7 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))] ${
            pinned ? 'w-max pr-[12vw]' : 'snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }`}
          aria-label={ui.publicLife.focusAria}
          tabIndex={pinned ? undefined : 0}
        >
          {focusAreas.map((f, i) => {
            const external = f.href.startsWith('http');
            const Card = (
              <article className="group flex h-full flex-col border border-ink/10 bg-paper transition-colors duration-500 hover:border-bronze">
                <div className="overflow-hidden p-3 pb-0">
                  <PhotoSlot photo={f.photo} tone={i % 2 ? 'dark' : 'light'} zoom className="aspect-[1.05/1] w-full" sizes="440px" />
                </div>
                <div className="flex items-center gap-4 border-t border-ink/10 px-5 py-4 mt-3">
                  <span className="flex h-8 min-w-8 items-center justify-center bg-paper-200 px-2 text-xs font-semibold tabular-nums text-bronze-deep">{num(String(i + 1).padStart(2, '0'))}</span>
                  <h3 className="flex-1 font-serif text-[1.45rem] leading-tight">{f.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-deep" aria-hidden />
                </div>
                <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-stone">{f.line}</p>
              </article>
            );
            return (
              <li key={f.title} className={`shrink-0 snap-start ${pinned ? 'focus-card-pinned' : 'w-[78vw] max-w-[22rem] sm:w-[22rem]'}`}>
                {external ? (
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="block h-full">{Card}</a>
                ) : (
                  <Link href={f.href} className="block h-full">{Card}</Link>
                )}
              </li>
            );
          })}
        </motion.ul>
        {!pinned && <p className="container-site mt-2 text-xs uppercase tracking-widest text-stone md:hidden">{ui.home.swipe}</p>}
      </div>
    </section>
  );
}
