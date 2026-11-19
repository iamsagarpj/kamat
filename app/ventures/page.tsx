import PageHero from '@/components/PageHero';
import BusinessCard from '@/components/BusinessCard';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { liveBusinesses } from '@/content/businesses';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Enterprise',
  description: 'Businesses led by Kamesh Kamble, including Vijaya Construction, government contractors, builders and developers in Khed, Satara.',
  path: '/ventures/',
});

export default function VenturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise"
        title="Building,"
        accent="beyond public office."
        intro="Alongside public service, I run my own business. Here is what I’ve built, and what I’m building next."
        crumbs={[{ name: 'Enterprise', path: '/ventures/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {liveBusinesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.1}><BusinessCard business={b} index={i} /></Reveal>
          ))}
        </div>
      </section>
      <CTASection title="Let’s build something together." text="Partnerships, project enquiries and new ideas for Khed are always welcome." />
    </>
  );
}
