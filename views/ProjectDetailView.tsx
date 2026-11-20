import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import ProjectGallery from '@/components/ProjectGallery';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { liveProjects, getProject } from '@/content/projects';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

/**
 * Static export needs at least one param. While no project is verified, a single
 * hidden placeholder route is generated that renders 404 (and is left out of the sitemap).
 */
export const projectParams = () => (liveProjects.length ? liveProjects.map((p) => ({ slug: p.slug })) : [{ slug: 'coming-soon' }]);

export const projectMeta = (lang: Lang, slug: string) => {
  const p = getProject(slug);
  if (!p) return { robots: { index: false } };
  return pageMeta({ lang, title: `${p.title}, ${p.location}`, description: p.description[0] ?? `${p.category}, ${p.location}.`, path: `/projects/${p.slug}/`, image: p.cover.src });
};

/** Project text is entered in content/projects.ts (one language for now; add Marathi fields when projects are documented). */
export default function ProjectDetailView({ lang, slug }: { lang: Lang; slug: string }) {
  const p = getProject(slug);
  if (!p) notFound();
  const c = getContent(lang);
  const t = c.ui.projectsPage;
  const business = c.businesses.find((b) => b.slug === p.businessSlug);
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={`${p.category} · ${t.statusLabel[p.status] ?? p.status}`}
        title={p.title}
        intro={p.location}
        crumbs={[{ name: c.ui.projects, path: '/projects/' }, { name: p.title, path: `/projects/${p.slug}/` }]}
      />
      <section className="section bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <PhotoSlot photo={p.cover} tone="light" priority className="aspect-[16/10] w-full" />
            <div className="mt-10 space-y-5 text-lead text-stone">{p.description.map((d) => <p key={d}>{d}</p>)}</div>
          </Reveal>
          <aside className="lg:col-span-5">
            <dl className="divide-y divide-ink/10 border-y border-ink/10 text-sm lg:sticky lg:top-28">
              {[
                [t.status, t.statusLabel[p.status] ?? p.status],
                [t.category, p.category],
                [t.location, p.location],
                [t.completedOn, p.completionDate],
              ].map(([k, v]) => v && (
                <div key={k} className="flex justify-between gap-4 py-4"><dt className="text-stone">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
              ))}
              {business && (
                <div className="flex justify-between gap-4 py-4">
                  <dt className="text-stone">{t.deliveredBy}</dt>
                  <dd><Link href={c.href(`/ventures/${business.slug}/`)} className="font-semibold underline decoration-bronze underline-offset-4">{business.name}</Link></dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </section>
      {p.photos.length > 0 && (
        <section className="section border-t border-ink/10 bg-paper">
          <div className="container-site">
            <h2 className="mb-10 text-h2">{t.gallery}</h2>
            <ProjectGallery lang={lang} items={p.photos.map((ph) => ({ ...ph, category: 'Business & Construction' as const }))} />
          </div>
        </section>
      )}
      <CTASection lang={lang} />
    </>
  );
}
