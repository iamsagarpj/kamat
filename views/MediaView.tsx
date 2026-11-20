import PageHero from '@/components/PageHero';
import SocialMediaSection from '@/components/SocialMediaSection';
import ActivityTimeline from '@/components/ActivityTimeline';
import InstagramEmbed from '@/components/InstagramEmbed';
import CTASection from '@/components/CTASection';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const mediaMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/media/',
    title: lang === 'mr' ? 'सोशल मीडिया | कामेश कांबळे' : 'Media & Social Presence',
    description:
      lang === 'mr'
        ? 'साताऱ्यातील कामाचे अपडेट्स पाहण्यासाठी कामेश कांबळे यांना Instagram (@kamesh_kamble_voice_of_khed) आणि Facebook वर फॉलो करा.'
        : 'Follow Kamesh Kamble on Instagram (@kamesh_kamble_voice_of_khed) and Facebook for updates on public work in Satara.',
  });

export default function MediaView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const t = c.ui.media;
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} crumbs={[{ name: c.nav[4].label, path: '/media/' }]} />
      <SocialMediaSection limit={4} lang={lang} />
      <section aria-labelledby="featured-title" className="section bg-paper">
        <div className="container-site">
          <h2 id="featured-title" className="text-h2">{t.featured}</h2>
          <p className="mt-4 max-w-2xl text-stone">{t.featuredNote}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {c.activities.slice(0, 2).map((a) => (
              <InstagramEmbed key={a.sourceUrl} url={a.sourceUrl} title={a.title} loadLabel={t.loadPost} openLabel={t.openInstagram} />
            ))}
          </div>
        </div>
      </section>
      <section className="section border-t border-ink/10 bg-paper">
        <div className="container-site max-w-5xl">
          <h2 className="mb-12 text-h2">{t.allActivities}</h2>
          <ActivityTimeline items={c.activities} lang={lang} />
        </div>
      </section>
      <CTASection lang={lang} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
