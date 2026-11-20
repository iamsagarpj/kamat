import PageHero from '@/components/PageHero';
import EventRows from '@/components/story/EventRows';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const publicLifeMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/public-life/',
    title: lang === 'mr' ? 'लोकांमध्ये | कामेश कांबळे' : 'In the Community',
    description:
      lang === 'mr'
        ? 'जिल्हा परिषद सदस्य कामेश कांबळे यांचे सार्वजनिक उपक्रम: नागरिकांशी संवाद, शिक्षण, सहकार आणि तरुणाईसाठी खेळ.'
        : 'Public activities of Kamesh Kamble, Zilla Parishad Member, Satara: citizen outreach, education, co-operative sector and youth sports.',
  });

export default function PublicLifeView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { ui, activities } = c;
  const themes = Array.from(new Set(activities.map((a) => a.theme)));
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={ui.publicLife.eyebrow}
        title={ui.publicLife.title}
        accent={ui.publicLife.accent}
        intro={ui.publicLife.intro}
        marathi={ui.publicLife.marathi || undefined}
        crumbs={[{ name: c.nav[1].label, path: '/public-life/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-xl">
              {ui.publicLife.roles.map((r) => <li key={r}>{r}</li>)}
            </ul>
            <ul className="flex flex-wrap gap-2" aria-label={ui.publicLife.focusAria}>
              {themes.map((t) => <li key={t} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm">{ui.themes[t] ?? t}</li>)}
            </ul>
          </Reveal>
          <EventRows items={activities} lang={lang} />
        </div>
      </section>
      <CTASection lang={lang} title={ui.publicLife.ctaTitle} text={ui.publicLife.ctaText} />
    </>
  );
}
