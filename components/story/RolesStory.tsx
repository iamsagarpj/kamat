'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getContent, type Lang } from '@/content/i18n';
import Pill from '../Pill';

/**
 * "Three roles, one person" — a sticky-scroll chapter. The left column stays
 * pinned and its big numeral follows whichever role panel is in view.
 * Without JS every panel simply reads as a list.
 */
export default function RolesStory({ lang = 'en' }: { lang?: Lang }) {
  const { story, ui, num } = getContent(lang);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="roles-title" className="relative bg-ink text-paper">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-site relative grid gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-0">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
            <Pill tone="dark">{ui.home.ch2}</Pill>
            <h2 id="roles-title" className="mt-5 text-h2">
              {ui.home.rolesTitle[0]} <span className="italic text-bronze-light">{ui.home.rolesTitle[1]}</span>
            </h2>
            <div className="relative mt-10 hidden h-[11rem] overflow-hidden lg:block" aria-hidden>
              {story.roles.map((_, i) => (
                <span
                  key={i}
                  className="absolute left-0 top-0 font-serif text-[11rem] leading-none text-outline transition-all duration-700 ease-out"
                  style={{ transform: `translateY(${(i - active) * 100}%)`, opacity: i === active ? 1 : 0 }}
                >
                  {num(`0${i + 1}`)}
                </span>
              ))}
            </div>
            <div className="mt-8 hidden gap-2 lg:flex" aria-hidden>
              {story.roles.map((_, i) => (
                <span key={i} className={`h-px transition-all duration-500 ${i === active ? 'w-16 bg-bronze-light' : 'w-6 bg-paper/25'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {story.roles.map((r, i) => (
            <div
              key={r.title}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className={`flex flex-col justify-center border-t border-paper/10 py-12 transition-opacity duration-700 lg:min-h-screen lg:border-t-0 lg:py-0 ${i === active ? 'lg:opacity-100' : 'lg:opacity-30'}`}
            >
              <p className="eyebrow text-bronze-light"><span className="font-serif text-base normal-case tracking-normal lg:hidden">{num(`0${i + 1}`)} · </span>{r.kicker}</p>
              <h3 className="mt-4 font-serif text-[clamp(2.2rem,1.4rem+3vw,4.5rem)] leading-[1.02] tracking-tight">{r.title}</h3>
              <p className="mt-6 max-w-xl text-lead text-paper/70">{r.text}</p>
              <Link href={r.href} className="link-underline mt-8 w-fit text-bronze-light">
                {r.cta} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
