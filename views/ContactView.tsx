import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Instagram, Facebook } from '@/components/icons';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { social } from '@/content/site';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const contactMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/contact/',
    title: lang === 'mr' ? 'संपर्क | कामेश कांबळे' : 'Contact',
    description:
      lang === 'mr'
        ? 'नागरिकांच्या तक्रारी, विजया कन्स्ट्रक्शनच्या प्रकल्पाची चौकशी, सोबत काम किंवा मीडियासाठी कामेश कांबळे यांच्याशी संपर्क साधा.'
        : 'Contact Kamesh Kamble for citizen concerns, Vijaya Construction project enquiries, collaborations and media requests.',
  });

export default function ContactView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { contact } = c;
  const t = c.ui.contact;
  const rows = [
    contact.phone && { Icon: Phone, label: t.phone, value: contact.phone, href: `tel:${contact.phone}` },
    contact.email && { Icon: Mail, label: t.email, value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { Icon: MessageCircle, label: t.whatsapp, value: t.whatsappValue, href: `https://wa.me/${contact.whatsapp}` },
    { Icon: MapPin, label: t.region, value: contact.officeAddress ?? contact.region },
  ].filter(Boolean) as { Icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        accent={t.accent}
        intro={t.intro}
        marathi={t.marathi || undefined}
        crumbs={[{ name: c.ui.letsTalk, path: '/contact/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-8 text-h3">{t.formTitle}</h2>
            <ContactForm lang={lang} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-[2rem] bg-ink p-8 text-paper sm:p-10">
              <h2 className="text-h3">{t.channels}</h2>
              <ul className="mt-8 space-y-6">
                {rows.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-bronze-light" aria-hidden />
                    <div>
                      <p className="eyebrow text-paper/60">{label}</p>
                      {href ? <a href={href} className="mt-1 block hover:text-bronze-light">{value}</a> : <p className="mt-1">{value}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-paper/10 pt-8">
                <p className="eyebrow text-paper/60">{t.social}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 break-all hover:text-bronze-light"><Instagram className="h-5 w-5 shrink-0" aria-hidden />{social.instagram.handle}</a>
                  <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 hover:text-bronze-light"><Facebook className="h-5 w-5 shrink-0" aria-hidden />{lang === 'mr' ? 'कामेश कांबळे' : social.facebook.handle}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
