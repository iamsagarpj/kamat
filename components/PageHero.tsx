import Link from 'next/link';
import JsonLd from './JsonLd';
import SplitText from './motion/SplitText';
import Reveal from './Reveal';
import { breadcrumbSchema } from '@/lib/seo';

/** Personal, editorial page header: oversized title with word reveal, breadcrumbs, optional Marathi line. */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  marathi,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  /** Last words of the title to set in bronze italic. */
  accent?: string;
  intro?: string;
  marathi?: string;
  crumbs: { name: string; path: string }[];
}) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs];
  const full = accent ? `${title} ${accent}` : title;
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <JsonLd data={breadcrumbSchema(all)} />
      <div className="grain absolute inset-0" aria-hidden />
      <div aria-hidden className="float-slow absolute -right-32 top-0 hidden h-[30rem] w-[30rem] rounded-full opacity-35 blur-3xl sm:block" style={{ background: 'radial-gradient(circle, rgba(192,138,74,0.4), transparent 65%)' }} />
      <div className="container-site relative pb-16 pt-32 sm:pb-24 sm:pt-44">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/55">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i < all.length - 1 ? (
                  <>
                    <Link href={c.path} className="hover:text-paper">{c.name}</Link>
                    <span aria-hidden>/</span>
                  </>
                ) : (
                  <span aria-current="page" className="text-bronze-light">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-12 flex items-center gap-3 text-bronze-light"><span className="rule" aria-hidden />{eyebrow}</p>
        <SplitText as="h1" text={full} emphasis={accent ? accent.split(' ').map((w) => w.replace(/[.,]/g, '')) : []} tone="dark" className="mt-6 max-w-5xl font-serif text-display" />
        {(intro || marathi) && (
          <Reveal delay={0.3} className="mt-8 grid gap-6 md:grid-cols-12">
            {intro && <p className="text-lead text-paper/70 md:col-span-7">{intro}</p>}
            {marathi && <p lang="mr" className="font-marathi text-xl text-bronze-light md:col-span-4 md:col-start-9 md:text-right">{marathi}</p>}
          </Reveal>
        )}
      </div>
    </section>
  );
}
