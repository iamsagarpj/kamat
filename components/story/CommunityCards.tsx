import { ArrowUpRight } from 'lucide-react';
import type { Activity } from '@/content/types';
import { formatDate } from '@/content/activities';
import PhotoSlot from '../PhotoSlot';
import Reveal from '../Reveal';

/** Editorial cards for recent activities: big date, lift-on-hover, link to the original post. */
export default function CommunityCards({ items }: { items: Activity[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((a, i) => {
        const d = new Date(a.date + 'T00:00:00');
        return (
          <Reveal as="li" key={a.sourceUrl} delay={i * 0.1} className={i === 1 ? 'md:mt-16' : ''}>
            <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="group block h-full transition-transform duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <PhotoSlot photo={a.photo ?? { alt: a.title, placeholderLabel: a.theme }} tone={i === 1 ? 'dark' : 'light'} zoom className="aspect-[4/5] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="absolute left-4 top-4 bg-paper px-3 py-2 text-center leading-none text-ink">
                  <span className="block font-serif text-3xl">{d.getDate()}</span>
                  <span className="mt-1 block text-[0.75rem] font-semibold uppercase tracking-wider">{d.toLocaleString('en-IN', { month: 'short' })} {d.getFullYear()}</span>
                </div>
              </div>
              <p className="eyebrow mt-5 text-bronze-deep">{a.theme}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug transition-colors group-hover:text-bronze-deep">{a.title}</h3>
              <p className="mt-2 line-clamp-3 text-[0.95rem] text-stone">{a.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                <span className="sr-only">{formatDate(a.date)}: </span>Read the post <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        );
      })}
    </ul>
  );
}
