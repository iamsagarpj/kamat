'use client';

import { useRef, type ReactNode } from 'react';

/** Gently pulls its child toward the pointer on hover (mouse only; off for reduced motion). */
export default function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = '');
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className={`inline-flex transition-transform duration-300 ease-out ${className}`}>
      {children}
    </span>
  );
}
