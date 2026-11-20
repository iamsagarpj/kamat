'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Photo } from '@/content/types';
import PhotoSlot from '../PhotoSlot';
import SplitText from '../motion/SplitText';

/**
 * Full-bleed cinematic band: a large photo that zooms gently as it passes,
 * with a line of text over it. Swap in a video later if one is available.
 */
export default function ImageBand({ photo, line, sub, emphasis = ['people', 'Khed'] }: { photo: Photo; line: string; sub?: string; emphasis?: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <section ref={ref} className="relative h-[70svh] min-h-[420px] overflow-hidden bg-ink text-paper md:h-[90svh]">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y }}>
        <PhotoSlot photo={photo} className="h-full w-full" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/20" aria-hidden />
      <div className="container-site relative flex h-full flex-col justify-end pb-14 sm:pb-20">
        <SplitText as="p" text={line} tone="dark" emphasis={emphasis} className="max-w-4xl font-serif text-display" />
        {sub && <p lang="mr" className="mt-6 font-marathi text-2xl text-bronze-light">{sub}</p>}
      </div>
    </section>
  );
}
