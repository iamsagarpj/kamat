import PageHero from '@/components/PageHero';
import SocialMediaSection from '@/components/SocialMediaSection';
import ActivityTimeline from '@/components/ActivityTimeline';
import InstagramEmbed from '@/components/InstagramEmbed';
import CTASection from '@/components/CTASection';
import { liveActivities } from '@/content/activities';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Media & Social Presence',
  description: 'Follow Kamesh Kamble on Instagram (@kamesh_kamble_voice_of_khed) and Facebook for updates on public work in Satara.',
  path: '/media/',
});

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Follow along,"
        accent="day by day."
        intro="My official social profiles, featured posts and recent public activities."
        crumbs={[{ name: 'Media', path: '/media/' }]}
      />
      <SocialMediaSection limit={4} />
      <section aria-labelledby="featured-title" className="section bg-paper">
        <div className="container-site">
          <h2 id="featured-title" className="text-h2">Featured posts</h2>
          <p className="mt-4 max-w-2xl text-stone">Posts load from Instagram only when you choose to view them, which keeps this page fast and private.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {liveActivities.slice(0, 2).map((a) => <InstagramEmbed key={a.sourceUrl} url={a.sourceUrl} title={a.title} />)}
          </div>
        </div>
      </section>
      <section className="section border-t border-ink/10 bg-paper">
        <div className="container-site max-w-5xl">
          <h2 className="mb-12 text-h2">All featured activities</h2>
          <ActivityTimeline items={liveActivities} />
        </div>
      </section>
      <CTASection title="Media and interview requests" text="Journalists and event organisers can reach out through the contact page." />
    </>
  );
}
