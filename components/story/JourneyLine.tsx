'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { milestones } from '@/content/site';
import Reveal from '../Reveal';

/** Milestones on a line that draws itself as you scroll. Vertical on mobile, horizontal on desktop. */
export default function JourneyLine({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const dark = tone === 'dark';

  return (
    <ol ref={ref} className="relative grid gap-12 pl-8 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-14">
      {/* track */}
      <span aria-hidden className={`absolute bottom-0 left-[5px] top-0 w-px md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto ${dark ? 'bg-paper/15' : 'bg-ink/15'}`} />
      <motion.span aria-hidden style={reduce ? undefined : { scaleY: p }} className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-bronze md:hidden" />
      <motion.span aria-hidden style={reduce ? undefined : { scaleX: p }} className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-bronze md:block" />

      {milestones.map((m, i) => (
        <Reveal as="li" key={m.year} delay={i * 0.12} className="relative">
          <span aria-hidden className="absolute -left-8 top-2 h-[11px] w-[11px] rotate-45 border border-bronze bg-paper md:-top-[54px] md:left-0" />
          <p className={`font-serif text-[clamp(2.6rem,2rem+2vw,3.8rem)] leading-none ${dark ? 'text-bronze-light' : 'text-bronze-deep'}`}>{m.year}</p>
          <h3 className={`mt-4 font-semibold ${dark ? 'text-paper' : ''}`}>{m.title}</h3>
          <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? 'text-paper/65' : 'text-stone'}`}>{m.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
