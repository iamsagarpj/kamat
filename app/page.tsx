import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import Marquee from '@/components/motion/Marquee';
import SplitText from '@/components/motion/SplitText';
import Parallax from '@/components/motion/Parallax';
import RolesStory from '@/components/story/RolesStory';
import FocusScroll from '@/components/story/FocusScroll';
import ImageBand from '@/components/story/ImageBand';
import EventRows from '@/components/story/EventRows';
import JourneyLine from '@/components/story/JourneyLine';
import Principles from '@/components/story/Principles';
import MomentsStrip from '@/components/story/MomentsStrip';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Pill from '@/components/Pill';
import PhotoSlot from '@/components/PhotoSlot';
import { liveActivities } from '@/content/activities';
import { profile, story } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Kamesh Kamble | आपला कामेश | Khed, Satara',
  description:
    'Kamesh Kamble (आपला कामेश) of Khed, Satara: Zilla Parishad Member, Standing Committee member and founder of Vijaya Construction. His story, public work and moments with the community.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <HeroSection />

      <Marquee
        items={[
          { text: profile.motto },
          { text: profile.shortMarathi, lang: 'mr' },
          { text: 'Voice of Khed' },
          { text: 'खेड, सातारा', lang: 'mr' },
          { text: profile.tagline },
        ]}
      />

      {/* Chapter 01: who I am */}
      <section aria-labelledby="intro-title" className="section bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Parallax offset={40} className="relative">
              <PhotoSlot photo={profile.aboutPortrait} tone="light" className="aspect-[4/5] w-full rounded-b-[999px]" />
            </Parallax>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Pill>Chapter 01 · Who I am</Pill>
            <SplitText id="intro-title" text={story.statement} mode="dim" emphasis={story.statementEmphasis} className="mt-8 font-serif text-statement" />
            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-3">
                {[
                  { k: 'Public office', v: 'Zilla Parishad Member, Satara' },
                  { k: 'Committee', v: 'Standing Committee' },
                  { k: 'Founded', v: 'Vijaya Construction, 2023' },
                ].map((f) => (
                  <div key={f.k} className="bg-paper py-5 sm:px-5 sm:first:pl-0">
                    <dt className="eyebrow text-bronze-deep">{f.k}</dt>
                    <dd className="mt-2 font-serif text-xl leading-snug">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/about/" className="link-underline mt-10 text-ink">Read my story <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 02: roles (sticky story) */}
      <RolesStory />

      {/* Chapter 03: pinned horizontal focus areas */}
      <FocusScroll />

      {/* Cinematic band */}
      <ImageBand
        photo={{ alt: 'Kamesh Kamble with people of Satara', placeholderLabel: 'Wide photo · with the people (or a short video)' }}
        line="For the people. With the people."
        sub="जनतेसाठी · जनतेसोबत"
      />

      {/* Chapter 04: on the ground (event rows) */}
      <section aria-labelledby="ground-title" className="section bg-paper">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Pill>Chapter 04 · On the ground</Pill>
              <SplitText id="ground-title" text="Where you’ll find me" emphasis={['find', 'me']} className="mt-5 text-h2" />
            </div>
            <Reveal className="flex flex-col gap-5 md:max-w-sm md:items-end md:text-right">
              <p className="text-stone">Schools, housing societies, sports grounds and co-operative meetings. Here’s what I’ve been doing lately.</p>
              <Link href="/public-life/" className="btn-ghost-dark">See everything <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
          </div>
          <div className="mt-14"><EventRows items={liveActivities.slice(0, 3)} /></div>
        </div>
      </section>

      {/* Chapter 05: journey + beliefs */}
      <section aria-labelledby="road-title" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <Pill>Chapter 05 · The road so far</Pill>
          <SplitText id="road-title" text="The road so far." emphasis={['so', 'far']} className="mt-5 text-h2" />
          <div className="mt-16"><JourneyLine /></div>
          <div className="mt-28">
            <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />What I believe</p>
            <div className="mt-8"><Principles /></div>
          </div>
        </div>
      </section>

      {/* Chapter 06: moments */}
      <MomentsStrip />

      <CTASection />
    </>
  );
}
