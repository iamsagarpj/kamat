'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Thin bronze reading-progress bar at the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-bronze"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
