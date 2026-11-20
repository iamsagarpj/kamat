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
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const homeMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/',
    title: lang === 'mr' ? 'कामेश कांबळे | आपला कामेश | खेड, सातारा' : 'Kamesh Kamble | आपला कामेश | Khed, Satara',
    description:
      lang === 'mr'
        ? 'खेड, साताऱ्याचे कामेश कांबळे (आपला कामेश): जिल्हा परिषद सदस्य, स्थायी समिती सदस्य आणि विजया कन्स्ट्रक्शनचे संस्थापक. त्यांची गोष्ट, लोकांसाठीचं काम आणि क्षणचित्रे.'
        : 'Kamesh Kamble (आपला कामेश) of Khed, Satara: Zilla Parishad Member, Standing Committee member and founder of Vijaya Construction. His story, public work and moments with the community.',
  });

export default function HomeView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { ui, story, profile } = c;
  const mr = lang === 'mr';
  return (
    <>
      <HeroSection lang={lang} />

      <Marquee items={ui.home.marquee.map((text) => ({ text, lang: /[ऀ-ॿ]/.test(text) ? 'mr' : undefined }))} />

      {/* Chapter 01: who I am */}
      <section aria-labelledby="intro-title" className="section bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Parallax offset={40} className="relative">
              <PhotoSlot photo={profile.aboutPortrait} tone="light" className="aspect-[4/5] w-full rounded-b-[999px]" />
            </Parallax>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Pill>{ui.home.ch1}</Pill>
            <SplitText id="intro-title" text={story.statement} mode="dim" emphasis={story.statementEmphasis} className="mt-8 font-serif text-statement" />
            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-3">
                {ui.home.facts.map((f) => (
                  <div key={f.k} className="bg-paper py-5 sm:px-5 sm:first:pl-0">
                    <dt className="eyebrow text-bronze-deep">{f.k}</dt>
                    <dd className="mt-2 font-serif text-xl leading-snug">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={c.href('/about/')} className="link-underline mt-10 text-ink">{ui.home.readStory} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 02: roles (sticky story) */}
      <RolesStory lang={lang} />

      {/* Chapter 03: pinned horizontal focus areas */}
      <FocusScroll lang={lang} />

      {/* Cinematic band */}
      <ImageBand
        photo={{ alt: mr ? 'साताऱ्यातील लोकांसोबत कामेश कांबळे' : 'Kamesh Kamble with people of Satara', placeholderLabel: mr ? 'लोकांसोबतचा मोठा फोटो (किंवा छोटा व्हिडिओ)' : 'Wide photo · with the people (or a short video)' }}
        line={ui.home.band.line}
        emphasis={ui.home.band.emphasis}
        sub={ui.home.band.sub || undefined}
      />

      {/* Chapter 04: on the ground (event rows) */}
      <section aria-labelledby="ground-title" className="section bg-paper">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Pill>{ui.home.ch4}</Pill>
              <SplitText id="ground-title" text={ui.home.groundTitle} emphasis={ui.home.groundEmphasis} className="mt-5 text-h2" />
            </div>
            <Reveal className="flex flex-col gap-5 md:max-w-sm md:items-end md:text-right">
              <p className="text-stone">{ui.home.groundIntro}</p>
              <Link href={c.href('/public-life/')} className="btn-ghost-dark">{ui.home.seeEverything} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
          </div>
          <div className="mt-14"><EventRows items={c.activities.slice(0, 3)} lang={lang} /></div>
        </div>
      </section>

      {/* Chapter 05: journey + beliefs */}
      <section aria-labelledby="road-title" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <Pill>{ui.home.ch5}</Pill>
          <SplitText id="road-title" text={ui.home.roadTitle} emphasis={ui.home.roadEmphasis} className="mt-5 text-h2" />
          <div className="mt-16"><JourneyLine lang={lang} /></div>
          <div className="mt-28">
            <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />{ui.home.believe}</p>
            <div className="mt-8"><Principles lang={lang} /></div>
          </div>
        </div>
      </section>

      {/* Chapter 06: moments */}
      <MomentsStrip lang={lang} />

      <CTASection lang={lang} />
    </>
  );
}
