import { ArrowUpRight } from 'lucide-react';
import { Instagram, Facebook } from './icons';
import { social } from '@/content/site';
import { liveActivities, formatDate } from '@/content/activities';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * Social presence. Links to his real profiles plus a "recent updates" strip
 * built from verified posts. No scraping: content is curated in content/activities.ts.
 */
export default function SocialMediaSection({ limit = 3 }: { limit?: number }) {
  const recent = liveActivities.slice(0, limit);
  const channels = [
    { ...social.instagram, Icon: Instagram, blurb: 'Day-to-day public work, events and greetings, mostly in Marathi.' },
    { ...social.facebook, Icon: Facebook, blurb: 'Reels, photographs and updates for the wider community.' },
  ];
  return (
    <section aria-labelledby="social-title" className="section bg-paper-200">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="On social media" title="Follow along, day by day" intro="I share my work, events and greetings here, mostly in Marathi." />
            <div className="mt-10 grid gap-4">
              {channels.map(({ Icon, ...c }, i) => (
                <Reveal key={c.url} delay={i * 0.08}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border border-ink/10 bg-paper p-5 transition-colors hover:border-bronze">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-bronze-light"><Icon className="h-5 w-5" aria-hidden /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{c.label}</span>
                      <span className="block break-all text-sm text-stone">{c.handle}</span>
                      <span className="mt-1 hidden text-sm text-stone sm:block">{c.blurb}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-colors group-hover:text-bronze-deep" aria-hidden />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-bronze-deep">Recent updates</p>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {recent.map((a, i) => (
                <Reveal as="li" key={a.sourceUrl} delay={i * 0.08}>
                  <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6">
                    <time dateTime={a.date} className="text-sm text-stone">{formatDate(a.date)}</time>
                    <span>
                      <span className="block font-serif text-xl transition-colors group-hover:text-bronze-deep">{a.title}</span>
                      <span className="mt-1 block text-sm text-stone">{a.theme}{a.place ? ` · ${a.place}` : ''}</span>
                    </span>
                    <span className="hidden text-sm font-semibold text-bronze-deep sm:inline">Instagram ↗</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
