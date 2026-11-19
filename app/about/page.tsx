import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import PhotoSlot from '@/components/PhotoSlot';
import Parallax from '@/components/motion/Parallax';
import SplitText from '@/components/motion/SplitText';
import JourneyLine from '@/components/story/JourneyLine';
import Principles from '@/components/story/Principles';
import CTASection from '@/components/CTASection';
import { profile } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'My Story',
  description:
    'The story of Kamesh Kamble of Khed, Satara: his roots, starting Vijaya Construction in 2023, and serving on the Satara Zilla Parishad and its Standing Committee.',
  path: '/about/',
});

/** First-person chapters. DRAFT wording for Kamesh sir's approval; all facts verified. */
const chapters = [
  {
    n: '01',
    title: 'Roots in Khed',
    body: [
      'I am from Khed, in Satara. I went to school at Maharaja Sayajirao Vidyalaya and then to D. Y. Patil College of Engineering and Technology in Kolhapur.',
      'Growing up here taught me that what matters to people is very practical: a road that holds up in the monsoon, a school that gives children a fair start, someone who answers when you call.',
    ],
    photo: { alt: 'Kamesh Kamble in Khed', placeholderLabel: 'Early years / Khed' },
  },
  {
    n: '02',
    title: 'Learning to build',
    body: [
      'In March 2023 I started Vijaya Construction. We work as government contractors, builders and developers, from Khed.',
      'Building teaches patience and accountability. A structure is either right or it isn’t, and everyone can see which.',
    ],
    photo: { alt: 'Vijaya Construction site', placeholderLabel: 'On site · Vijaya Construction' },
  },
  {
    n: '03',
    title: 'Serving Satara',
    body: [
      'Today I serve as a member of the Satara Zilla Parishad and sit on its Standing Committee.',
      'Most of my week is spent outside an office: in schools, in housing societies, at sports grounds and at co-operative meetings, listening first and then following through.',
    ],
    photo: { alt: 'Kamesh Kamble at a public programme', placeholderLabel: 'Public programme · Satara' },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="My story"
        title="From Khed,"
        accent="for my people."
        intro="Who I am, where I come from, and why I do this work."
        marathi={`श्री. ${profile.nameMarathi}`}
        crumbs={[{ name: 'My Story', path: '/about/' }]}
      />

      {chapters.map((c, i) => (
        <section key={c.n} aria-labelledby={`ch-${c.n}`} className={`section ${i % 2 ? 'bg-paper-200' : 'bg-paper'}`}>
          <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
              <Parallax offset={50}>
                <PhotoSlot photo={c.photo} tone={i === 1 ? 'dark' : 'light'} className={`aspect-[4/5] w-full ${i % 2 ? 'rounded-t-[999px]' : 'rounded-b-[999px]'}`} />
              </Parallax>
            </div>
            <div className="lg:col-span-7">
              <p className="font-serif text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-outline" aria-hidden style={{ WebkitTextStroke: '1px rgba(135,90,34,0.45)' }}>{c.n}</p>
              <SplitText id={`ch-${c.n}`} text={c.title} className="mt-2 text-h1" />
              <Reveal delay={0.15}>
                <div className="mt-8 max-w-2xl space-y-5 text-lead text-stone">{c.body.map((p) => <p key={p}>{p}</p>)}</div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="motto" className="section bg-ink text-paper">
        <div className="container-site text-center">
          <p className="eyebrow text-bronze-light">My motto</p>
          <SplitText id="motto" as="p" text={`“${profile.motto}”`} className="mx-auto mt-8 max-w-4xl font-serif text-display italic" />
          <p lang="mr" className="mt-8 font-marathi text-2xl text-bronze-light">{profile.shortMarathi}</p>
        </div>
      </section>

      <section aria-labelledby="believe" className="section bg-paper">
        <div className="container-site">
          <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />What I believe</p>
          <SplitText id="believe" text="Four things I hold on to." className="mt-5 text-h2" />
          <div className="mt-12"><Principles /></div>
        </div>
      </section>

      <section aria-labelledby="road" className="section border-t border-ink/10 bg-paper-200">
        <div className="container-site">
          <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />Milestones</p>
          <SplitText id="road" text="The road so far." className="mt-5 text-h2" />
          <div className="mt-16"><JourneyLine /></div>
          <p className="mt-12 text-xs text-stone">Only milestones confirmed from public profiles are shown.</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
