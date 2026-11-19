import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { profile } from '@/content/site';
import Reveal from './Reveal';
import PhotoSlot from './PhotoSlot';

/** Home-page introduction: editorial split with a facts ledger. */
export default function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="section bg-paper">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <PhotoSlot photo={profile.aboutPortrait} tone="light" className="aspect-[4/5] w-full" />
        </Reveal>
        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-bronze-deep"><span className="rule" aria-hidden />Introduction</p>
            <h2 id="about-title" className="mt-5 text-h2">
              One person, two ways to serve:{' '}
              <span className="italic text-bronze-deep">public office and enterprise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lead text-stone">
              <p>
                Kamesh Kamble represents the people of his area as a member of the Satara Zilla Parishad, where he also
                sits on the Standing Committee. On Instagram he’s known as the <em>Voice of Khed</em>.
              </p>
              <p>
                Since March 2023 he has run Vijaya Construction, a Khed-based firm working as government contractors,
                builders and developers. Public service and construction both come down to the same thing for him:
                turning a community’s needs into work you can see on the ground.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-3">
              {[
                { k: 'Public office', v: 'Zilla Parishad Member, Satara' },
                { k: 'Committee', v: 'Standing Committee Member' },
                { k: 'Enterprise', v: 'Vijaya Construction, since 2023' },
              ].map((f, i) => (
                <div key={f.k} className={`border-b border-ink/10 py-6 sm:border-b-0 sm:pr-6 ${i > 0 ? 'sm:border-l sm:pl-6' : ''}`}>
                  <dt className="eyebrow text-bronze-deep">{f.k}</dt>
                  <dd className="mt-2 font-serif text-xl leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about/" className="link-underline mt-10 text-ink">
              Read the full story <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
