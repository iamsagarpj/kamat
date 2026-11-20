import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { liveProjects } from '@/content/projects';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const projectsMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/projects/',
    title: lang === 'mr' ? 'प्रकल्प | कामेश कांबळे' : 'Projects & Current Work',
    description:
      lang === 'mr'
        ? 'विजया कन्स्ट्रक्शन आणि कामेश कांबळे यांच्या इतर व्यवसायांचे सातारा जिल्ह्यातील सुरू असलेले आणि पूर्ण झालेले प्रकल्प.'
        : 'Ongoing and completed projects by Vijaya Construction and other ventures led by Kamesh Kamble in Satara district.',
  });

export default function ProjectsView({ lang }: { lang: Lang }) {
  const { ui } = getContent(lang);
  const t = ui.projectsPage;
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} crumbs={[{ name: ui.projects, path: '/projects/' }]} />
      <section className="section bg-paper">
        <div className="container-site">
          {liveProjects.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {liveProjects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
                  <ProjectCard project={p} large={i % 3 === 0} base={lang === 'mr' ? '/mr' : ''} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-h3">{t.emptyTitle}</p>
              <p className="mt-4 text-lead text-stone">{t.emptyText}</p>
              <ul className="mx-auto mt-10 grid max-w-xl gap-px border border-ink/10 bg-ink/10 text-left text-sm sm:grid-cols-2">
                {t.fields.map((f) => <li key={f} className="bg-paper px-5 py-4 text-stone">{f}</li>)}
              </ul>
            </Reveal>
          )}
        </div>
      </section>
      <CTASection lang={lang} />
    </>
  );
}
