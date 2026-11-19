'use client';

import type { ReactNode, CSSProperties } from 'react';
import { useInViewClass } from './motion/useInViewClass';

/** Scroll-triggered fade/rise (progressive enhancement, see globals.css). */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useInViewClass<HTMLElement>();
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
