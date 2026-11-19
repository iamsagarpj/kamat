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
import { orgSchema, pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return liveBusinesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const b = getBusiness((await params).slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.name}, ${b.location}`,
    description: `${b.name}: ${b.category}. Led by Kamesh Kamble, ${b.role}, since ${b.since}.`,
    path: `/ventures/${b.slug}/`,
  });
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const b = getBusiness((await params).slug);
  if (!b) notFound();
  const projects = projectsForBusiness(b.slug);
  const ongoing = projects.filter((p) => p.status === 'Ongoing');
  const completed = projects.filter((p) => p.status === 'Completed');

  return (
    <>
      <JsonLd data={orgSchema(b)} />
      <PageHero
        eyebrow={`My enterprise · Since ${b.since}`}
        title={b.name}
        intro={`${b.category}. Founded and led by Kamesh Kamble, ${b.location}.`}
        crumbs={[{ name: 'Enterprise', path: '/ventures/' }, { name: b.name, path: `/ventures/${b.slug}/` }]}
      />

      <section className="section bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-h2">Overview</h2>
              <div className="mt-6 space-y-5 text-lead text-stone">{b.overview.map((p) => <p key={p}>{p}</p>)}</div>
            </Reveal>
            <Reveal className="mt-14">
              <h2 className="text-h2">Services</h2>
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
                <h2 className="text-h2">Vision</h2>
                <p className="mt-6 text-lead text-stone">{b.vision}</p>
              </Reveal>
            )}
          </div>
          <aside className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <PhotoSlot photo={b.cover} tone="light" className="aspect-[4/5] w-full" />
              <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-sm">
                {[
                  ['Leadership', `Kamesh Kamble, ${b.role}`],
                  ['Established', b.since],
                  ['Based in', b.location],
                ].map(([k, v]) => v && (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-stone">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
                ))}
              </dl>
              <Link href="/contact/" className="btn-ink mt-6 w-full">Send a project enquiry</Link>
            </Reveal>
          </aside>
        </div>
      </section>

      <section aria-labelledby="vp-projects" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <h2 id="vp-projects" className="text-h2">Projects</h2>
          {projects.length === 0 ? (
            <p className="mt-6 max-w-2xl text-lead text-stone">
              Ongoing and completed projects, with photo galleries, will appear here once they’ve been documented and
              verified.
            </p>
          ) : (
            <>
              {[['Ongoing', ongoing], ['Completed', completed]].map(([label, list]) =>
                (list as typeof projects).length ? (
                  <div key={label as string} className="mt-12">
                    <h3 className="eyebrow text-bronze-deep">{label as string}</h3>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {(list as typeof projects).map((p) => <ProjectCard key={p.slug} project={p} />)}
                    </div>
                  </div>
                ) : null,
              )}
            </>
          )}
        </div>
      </section>

      <CTASection title={`Planning a project with ${b.name}?`} text="Share a few details and the team will get back to you." />
    </>
  );
}
