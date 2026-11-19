import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { liveProjects } from '@/content/projects';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Projects & Current Work',
  description: 'Ongoing and completed projects by Vijaya Construction and other ventures led by Kamesh Kamble in Satara district.',
  path: '/projects/',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work you can see"
        accent="on the ground."
        intro="Ongoing and completed projects, each with its location, status and photos from the site."
        crumbs={[{ name: 'Projects', path: '/projects/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site">
          {liveProjects.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {liveProjects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
                  <ProjectCard project={p} large={i % 3 === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-h3">The portfolio is being prepared.</p>
              <p className="mt-4 text-lead text-stone">
                Project records and site photos are being collected from Vijaya Construction. To keep things accurate,
                only verified projects will be published here, each with its own detail page.
              </p>
              <ul className="mx-auto mt-10 grid max-w-xl gap-px border border-ink/10 bg-ink/10 text-left text-sm sm:grid-cols-2">
                {['Project title & location', 'Category & business', 'Status: Ongoing / Completed', 'Completion date', 'Description', 'Photo gallery'].map((f) => (
                  <li key={f} className="bg-paper px-5 py-4 text-stone">{f}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}
