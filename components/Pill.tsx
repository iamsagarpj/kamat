import type { ReactNode } from 'react';

/** Small label chip with a pulsing dot, used above section titles. */
export default function Pill({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] ${
        dark ? 'border-paper/15 bg-paper/5 text-bronze-light' : 'border-ink/10 bg-paper-200 text-bronze-deep'
      }`}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-50 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
      </span>
      {children}
    </span>
  );
}
