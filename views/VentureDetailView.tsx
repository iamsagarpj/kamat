import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import CTASection from '@/components/CTASection';
import { liveBusinesses, getBusiness } from '@/content/businesses';
import { projectsForBusiness } from '@/content/projects';
import { getContent, type Lang } from '@/content/i18n';
import { orgSchema, pageMeta } from '@/lib/seo';

export const ventureParams = () => liveBusinesses.map((b) => ({ slug: b.slug }));

export const ventureMeta = (lang: Lang, slug: string) => {
  const base = getBusiness(slug);
  const b = getContent(lang).businesses.find((x) => x.slug === slug);
  if (!base || !b) return {};
  return pageMeta({
    lang,
    path: `/ventures/${b.slug}/`,
    title: `${b.name}, ${b.location}`,
    description:
      lang === 'mr'
        ? `${b.name}: ${b.category}. ${b.since} पासून कामेश कांबळे (${b.role}) यांचं नेतृत्व.`
        : `${b.name}: ${b.category}. Led by Kamesh Kamble, ${b.role}, since ${b.since}.`,
  });
};

export default function VentureDetailView({ lang, slug }: { lang: Lang; slug: string }) {
  const c = getContent(lang);
  const { ui } = c;
  const t = ui.ventures;
  const b = c.businesses.find((x) => x.slug === slug);
  const base = getBusiness(slug);
  if (!b || !base) notFound();
  const projects = projectsForBusiness(b.slug);
  const ongoing = projects.filter((p) => p.status === 'Ongoing');
  const completed = projects.filter((p) => p.status === 'Completed');
  const prefix = lang === 'mr' ? '/mr' : '';

  return (
    <>
      <JsonLd data={orgSchema(base)} />
      <PageHero
        lang={lang}
        eyebrow={`${t.detailEyebrow} ${b.since}`}
        title={b.name}
        intro={t.detailIntro(b.category, b.location ?? '')}
        crumbs={[{ name: c.nav[2].label, path: '/ventures/' }, { name: b.name, path: `/ventures/${b.slug}/` }]}
      />

      <section className="section bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-h2">{t.overview}</h2>
              <div className="mt-6 space-y-5 text-lead text-stone">{b.overview.map((p) => <p key={p}>{p}</p>)}</div>
            </Reveal>
            <Reveal className="mt-14">
              <h2 className="text-h2">{t.services}</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {b.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 border-t border-ink/10 pt-4">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-bronze-deep" aria-hidden />
                    <span className="font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            {b.vision && (
              <Reveal className="mt-14">
                <h2 className="text-h2">{t.vision}</h2>
                <p className="mt-6 text-lead text-stone">{b.vision}</p>
              </Reveal>
            )}
          </div>
          <aside className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <PhotoSlot photo={b.cover} tone="light" className="aspect-[4/5] w-full" />
              <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm">
                {[
                  [t.leadership, t.leadershipValue(b.role)],
                  [t.established, b.since],
                  [t.basedIn, b.location],
                ].map(([k, v]) => v && (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-stone">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
                ))}
              </dl>
              <Link href={c.href('/contact/')} className="btn-ink mt-6 w-full">{t.enquiry}</Link>
            </Reveal>
          </aside>
        </div>
      </section>

      <section aria-labelledby="vp-projects" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <h2 id="vp-projects" className="text-h2">{t.projects}</h2>
          {projects.length === 0 ? (
            <p className="mt-6 max-w-2xl text-lead text-stone">{t.noProjects}</p>
          ) : (
            <>
              {([[t.ongoing, ongoing], [t.completed, completed]] as const).map(([label, list]) =>
                list.length ? (
                  <div key={label} className="mt-12">
                    <h3 className="eyebrow text-bronze-deep">{label}</h3>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {list.map((p) => <ProjectCard key={p.slug} project={p} base={prefix} />)}
                    </div>
                  </div>
                ) : null,
              )}
            </>
          )}
        </div>
      </section>

      <CTASection lang={lang} title={t.detailCtaTitle(b.name)} text={t.detailCtaText} />
    </>
  );
}
