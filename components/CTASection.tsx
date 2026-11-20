import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { social } from '@/content/site';
import { getContent, type Lang } from '@/content/i18n';
import SplitText from './motion/SplitText';
import Magnetic from './motion/Magnetic';
import Reveal from './Reveal';

/** Personal closing invitation used at the end of every page. */
export default function CTASection({
  title,
  text,
  lang = 'en',
}: {
  title?: string;
  text?: string;
  lang?: Lang;
}) {
  const { ui, href } = getContent(lang);
  title = title ?? ui.cta.title;
  text = text ?? ui.cta.text;
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink text-paper">
      <div className="grain absolute inset-0" aria-hidden />
      <div aria-hidden className="float-slow absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(192,138,74,0.45), transparent 65%)' }} />
      <div className="container-site relative py-24 sm:py-32">
        <p className="eyebrow flex items-center gap-3 text-bronze-light"><span className="rule" aria-hidden />{ui.cta.pill}</p>
        <SplitText id="cta-title" text={title} className="mt-6 max-w-5xl font-serif text-display" emphasis={ui.cta.emphasis} tone="dark" />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <p className="text-lead text-paper/70">{text}</p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-6 md:col-span-6 md:justify-end">
            <Magnetic strength={0.4}>
              <Link href={href('/contact/')} className="group flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full bg-bronze text-center font-semibold text-ink transition-colors hover:bg-bronze-light sm:h-44 sm:w-44">
                {ui.cta.button}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Magnetic>
            <div className="flex flex-col text-sm">
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline w-fit text-paper/80">Instagram</a>
              <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="link-underline w-fit text-paper/80">Facebook</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
