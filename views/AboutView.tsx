import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import PhotoSlot from '@/components/PhotoSlot';
import Parallax from '@/components/motion/Parallax';
import SplitText from '@/components/motion/SplitText';
import JourneyLine from '@/components/story/JourneyLine';
import Principles from '@/components/story/Principles';
import CTASection from '@/components/CTASection';
import { profile as profileBase } from '@/content/site';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const aboutMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/about/',
    title: lang === 'mr' ? 'माझी गोष्ट | कामेश कांबळे' : 'My Story',
    description:
      lang === 'mr'
        ? 'खेड, साताऱ्याच्या कामेश कांबळे यांची गोष्ट: खेडची मुळं, २०२३ मध्ये विजया कन्स्ट्रक्शनची सुरुवात आणि सातारा जिल्हा परिषद व स्थायी समितीवरचं काम.'
        : 'The story of Kamesh Kamble of Khed, Satara: his roots, starting Vijaya Construction in 2023, and serving on the Satara Zilla Parishad and its Standing Committee.',
  });

export default function AboutView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { ui, profile } = c;
  const mr = lang === 'mr';
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={ui.about.eyebrow}
        title={ui.about.title}
        accent={ui.about.accent}
        intro={ui.about.intro}
        marathi={mr ? undefined : `श्री. ${profileBase.nameMarathi}`}
        crumbs={[{ name: c.nav[0].label, path: '/about/' }]}
      />

      {ui.about.chapters.map((ch, i) => {
        const n = c.num(`0${i + 1}`);
        return (
          <section key={i} aria-labelledby={`ch-${i + 1}`} className={`section ${i % 2 ? 'bg-paper-200' : 'bg-paper'}`}>
            <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Parallax offset={50}>
                  <PhotoSlot photo={{ alt: ch.title, placeholderLabel: ch.photo }} tone={i === 1 ? 'dark' : 'light'} className={`aspect-[4/5] w-full ${i % 2 ? 'rounded-t-[999px]' : 'rounded-b-[999px]'}`} />
                </Parallax>
              </div>
              <div className="lg:col-span-7">
                <p className="font-serif text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-outline" aria-hidden style={{ WebkitTextStroke: '1px rgba(135,90,34,0.45)' }}>{n}</p>
                <SplitText id={`ch-${i + 1}`} text={ch.title} className="mt-2 text-h1" />
                <Reveal delay={0.15}>
                  <div className="mt-8 max-w-2xl space-y-5 text-lead text-stone">{ch.body.map((p) => <p key={p}>{p}</p>)}</div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="motto" className="section bg-ink text-paper">
        <div className="container-site text-center">
          <p className="eyebrow text-bronze-light">{ui.about.mottoLabel}</p>
          <SplitText id="motto" as="p" text={`“${profile.motto}”`} className="mx-auto mt-8 max-w-4xl font-serif text-display italic" />
          <p lang="mr" className="mt-8 font-marathi text-2xl text-bronze-light">{profileBase.shortMarathi}</p>
        </div>
      </section>

      <section aria-labelledby="believe" className="section bg-paper">
        <div className="container-site">
          <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />{ui.home.believe}</p>
          <SplitText id="believe" text={ui.about.believeTitle} className="mt-5 text-h2" />
          <div className="mt-12"><Principles lang={lang} /></div>
        </div>
      </section>

      <section aria-labelledby="road" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />{ui.about.milestones}</p>
          <SplitText id="road" text={ui.about.roadTitle} className="mt-5 text-h2" />
          <div className="mt-16"><JourneyLine lang={lang} /></div>
          <p className="mt-12 text-xs text-stone">{ui.about.note}</p>
        </div>
      </section>

      <CTASection lang={lang} />
    </>
  );
}
