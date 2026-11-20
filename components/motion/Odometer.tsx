'use client';

import type { CSSProperties } from 'react';
import { useInViewClass } from './useInViewClass';

/**
 * Rolling-digit number (like a mechanical counter). Each digit column spins
 * into place when it scrolls into view. The final value is in the HTML,
 * so it reads correctly without JS and for screen readers.
 */
const DEVA = '०१२३४५६७८९';

export default function Odometer({ value, className = '', deva = false }: { value: string; className?: string; deva?: boolean }) {
  const label = deva ? value.replace(/\d/g, (d) => DEVA[Number(d)]) : value;
  const ref = useInViewClass<HTMLSpanElement>('0px');
  return (
    <span ref={ref} className={`odo inline-flex overflow-hidden leading-none ${className}`} aria-label={label} role="img">
      {value.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden">
            <span className="odo-col block" style={{ '--n': Number(ch), '--i': i } as CSSProperties}>
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em]">{deva ? DEVA[d] : d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>{ch}</span>
        ),
      )}
    </span>
  );
}
