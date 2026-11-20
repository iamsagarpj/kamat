import { ArrowUpRight, MapPin, Tag } from 'lucide-react';
import type { Activity } from '@/content/types';
import PhotoSlot from '../PhotoSlot';
import Reveal from '../Reveal';
import { getContent, type Lang } from '@/content/i18n';

/** Scalloped "seal" date badge that slowly turns. */
function DateSeal({ iso, lang }: { iso: string; lang: Lang }) {
  const dm = getContent(lang).dayMonth(iso);
  const points = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = i % 2 ? 46 : 50;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32" aria-hidden>
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full [animation-duration:40s]">
        <polygon points={points} className="fill-ink" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-paper">
        <span className="font-serif text-2xl leading-none lg:text-3xl">{dm.day}</span>
        <span className="mt-1 text-[0.75rem] font-semibold uppercase tracking-wider text-bronze-light">
          {dm.month} {dm.year}
        </span>
      </div>
    </div>
  );
}

/** Event-list layout: seal date · photo · details. Each row links to the original post. */
export default function EventRows({ items, lang = 'en' }: { items: Activity[]; lang?: Lang }) {
  const { ui } = getContent(lang);
  return (
    <ol className="border-t border-ink/10">
      {items.map((a, i) => (
        <Reveal as="li" key={a.sourceUrl} delay={i * 0.05}>
          <article className="group relative grid items-center gap-5 border-b border-ink/10 py-8 md:grid-cols-12 md:gap-8 lg:py-10">
            <div className="absolute left-3 top-11 z-10 lg:static lg:col-span-2">
              <time dateTime={a.date} className="sr-only">{a.date}</time>
              <DateSeal iso={a.date} lang={lang} />
            </div>
            <div className="overflow-hidden md:col-span-5 lg:col-span-4">
              <PhotoSlot photo={a.photo ?? { alt: a.title, placeholderLabel: ui.themes[a.theme] ?? a.theme }} tone={i % 2 ? 'dark' : 'light'} zoom className="aspect-[16/11] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="md:col-span-7 lg:col-span-6 lg:pl-4">
              <h3 className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-tight transition-colors group-hover:text-bronze-deep">{a.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-stone">{a.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone">
                {a.place && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-bronze-deep" aria-hidden />{a.place}</span>}
                <span className="flex items-center gap-1.5"><Tag className="h-4 w-4 text-bronze-deep" aria-hidden />{ui.themes[a.theme] ?? a.theme}</span>
              </div>
              <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark mt-6 min-h-[44px] px-5">
                {ui.events.seePost} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
