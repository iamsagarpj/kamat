'use client';

import type { CSSProperties, ElementType } from 'react';
import { useInViewClass } from './useInViewClass';

/**
 * Splits text into words and animates them in as it enters the viewport.
 * mode "rise": each word slides up out of a mask (headlines).
 * mode "dim":  words brighten one after another (large statements).
 * Normal spaces sit between word masks so lines wrap naturally.
 * Text stays readable by screen readers and is visible without JS.
 */
export default function SplitText({
  text,
  as: Tag = 'h2',
  className = '',
  mode = 'rise',
  delayMs = 0,
  emphasis = [],
  id,
  tone = 'light',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: 'rise' | 'dim';
  delayMs?: number;
  /** Words (punctuation stripped) to set in bronze italic. */
  emphasis?: string[];
  id?: string;
  /** Accent colour for emphasised words: deep bronze on light backgrounds, light bronze on dark. */
  tone?: 'light' | 'dark';
}) {
  const ref = useInViewClass<HTMLElement>('0px 0px -12% 0px');
  const words = text.split(' ');
  const strip = (w: string) => w.replace(/[.,:;!?’'"“”]/g, '');
  return (
    <Tag ref={ref} id={id} aria-label={text} className={`${mode === 'rise' ? 'split' : 'dim-words'} ${className}`} style={{ '--d': `${delayMs}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="w" style={{ '--i': i } as CSSProperties}>
            <span className={emphasis.includes(strip(w)) ? `italic ${tone === 'dark' ? 'text-bronze-light' : 'text-bronze-deep'}` : undefined}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
