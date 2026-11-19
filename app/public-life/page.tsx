import PageHero from '@/components/PageHero';
import EventRows from '@/components/story/EventRows';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { liveActivities } from '@/content/activities';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'In the Community',
  description:
    'Public activities of Kamesh Kamble, Zilla Parishad Member, Satara: citizen outreach, education, co-operative sector and youth sports.',
  path: '/public-life/',
});

export default function PublicLifePage() {
  const themes = Array.from(new Set(liveActivities.map((a) => a.theme)));
  return (
    <>
      <PageHero
        eyebrow="In the community"
        title="Where you’ll"
        accent="find me."
        intro="Schools, housing societies, sports grounds, co-operative meetings. A record of my public work as a Zilla Parishad member, each linked to the original post."
        marathi="जनतेसाठी · जनतेसोबत"
        crumbs={[{ name: 'In the Community', path: '/public-life/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-xl">
              <li>Member, Zilla Parishad Satara</li>
              <li>Member, Standing Committee</li>
            </ul>
            <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
              {themes.map((t) => <li key={t} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm">{t}</li>)}
            </ul>
          </Reveal>
          <EventRows items={liveActivities} />
        </div>
      </section>
      <CTASection title="Is something wrong in your area?" text="Tell me where and what. I read every concern and follow up on it." />
    </>
  );
}
