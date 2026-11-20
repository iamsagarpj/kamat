import PageHero from '@/components/PageHero';
import BusinessCard from '@/components/BusinessCard';
import Reveal from '@/components/Reveal';
import CTASection from '@/components/CTASection';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const venturesMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/ventures/',
    title: lang === 'mr' ? 'व्यवसाय | कामेश कांबळे' : 'Enterprise',
    description:
      lang === 'mr'
        ? 'कामेश कांबळे यांचे व्यवसाय, त्यात खेड, साताऱ्यातील विजया कन्स्ट्रक्शन: सरकारी कंत्राटदार, बिल्डर्स आणि डेव्हलपर्स.'
        : 'Businesses led by Kamesh Kamble, including Vijaya Construction, government contractors, builders and developers in Khed, Satara.',
  });

export default function VenturesView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { ui } = c;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={ui.ventures.eyebrow}
        title={ui.ventures.title}
        accent={ui.ventures.accent}
        intro={ui.ventures.intro}
        crumbs={[{ name: c.nav[2].label, path: '/ventures/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {c.businesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.1}><BusinessCard business={b} index={i} base={lang === 'mr' ? '/mr' : ''} /></Reveal>
          ))}
        </div>
      </section>
      <CTASection lang={lang} title={ui.ventures.ctaTitle} text={ui.ventures.ctaText} />
    </>
  );
}
