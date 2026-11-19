import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import ProjectGallery from '@/components/ProjectGallery';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { liveProjects, getProject } from '@/content/projects';
import { getBusiness } from '@/content/businesses';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;

/**
 * Static export needs at least one param. While no project is verified, a single
 * hidden placeholder route is generated that renders 404 (and is left out of the sitemap).
 */
export function generateStaticParams() {
  return liveProjects.length ? liveProjects.map((p) => ({ slug: p.slug })) : [{ slug: 'coming-soon' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) return { robots: { index: false } };
  return pageMeta({
    title: `${p.title}, ${p.location}`,
    description: p.description[0] ?? `${p.category} project in ${p.location}.`,
    path: `/projects/${p.slug}/`,
    image: p.cover.src,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const business = getBusiness(p.businessSlug);

  return (
    <>
      <PageHero
        eyebrow={`${p.category} · ${p.status}`}
        title={p.title}
        intro={p.location}
        crumbs={[{ name: 'Projects', path: '/projects/' }, { name: p.title, path: `/projects/${p.slug}/` }]}
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
                ['Status', p.status],
                ['Category', p.category],
                ['Location', p.location],
                ['Completed', p.completionDate],
              ].map(([k, v]) => v && (
                <div key={k} className="flex justify-between gap-4 py-4"><dt className="text-stone">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
              ))}
              {business && (
                <div className="flex justify-between gap-4 py-4">
                  <dt className="text-stone">Delivered by</dt>
                  <dd><Link href={`/ventures/${business.slug}/`} className="font-semibold underline decoration-bronze underline-offset-4">{business.name}</Link></dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </section>
      {p.photos.length > 0 && (
        <section className="section border-t border-ink/10 bg-paper">
          <div className="container-site">
            <h2 className="mb-10 text-h2">Project gallery</h2>
            <ProjectGallery items={p.photos.map((ph) => ({ ...ph, category: 'Business & Construction' as const }))} />
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
