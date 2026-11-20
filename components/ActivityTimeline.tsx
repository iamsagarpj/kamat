import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Activity } from '@/content/types';
import { getContent, type Lang } from '@/content/i18n';
import Reveal from './Reveal';

/** Vertical editorial timeline of verified public activities, each linked to its source post. */
export default function ActivityTimeline({ items, tone = 'light', lang = 'en' }: { items: Activity[]; tone?: 'light' | 'dark'; lang?: Lang }) {
  const { formatDate, ui } = getContent(lang);
  const dark = tone === 'dark';
  return (
    <ol className={`relative border-l ${dark ? 'border-paper/15' : 'border-ink/15'} ml-1.5`}>
      {items.map((a, i) => (
        <Reveal as="li" key={a.sourceUrl} delay={i * 0.06} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
          <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rotate-45 border border-bronze bg-bronze/30" aria-hidden />
          <div className="grid gap-3 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <time dateTime={a.date} className={`block font-serif text-lg ${dark ? 'text-bronze-light' : 'text-bronze-deep'}`}>{formatDate(a.date)}</time>
              <p className={`eyebrow mt-1 ${dark ? 'text-paper/60' : 'text-stone'}`}>{ui.themes[a.theme] ?? a.theme}</p>
            </div>
            <div className="md:col-span-9">
              <h3 className={`text-h3 ${dark ? 'text-paper' : ''}`}>{a.title}</h3>
              {a.place && (
                <p className={`mt-2 flex items-center gap-1.5 text-sm ${dark ? 'text-paper/60' : 'text-stone'}`}>
                  <MapPin className="h-3.5 w-3.5" aria-hidden />{a.place}
                </p>
              )}
              <p className={`mt-3 max-w-2xl leading-relaxed ${dark ? 'text-paper/75' : 'text-stone'}`}>{a.summary}</p>
              <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className={`link-underline mt-4 text-sm ${dark ? 'text-bronze-light' : 'text-bronze-deep'}`}>
                {ui.events.viewOriginal} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
