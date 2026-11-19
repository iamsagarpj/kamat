import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Instagram, Facebook } from '@/components/icons';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { contact, social } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description: 'Contact Kamesh Kamble for citizen concerns, Vijaya Construction project enquiries, collaborations and media requests.',
  path: '/contact/',
});

export default function ContactPage() {
  const rows = [
    contact.phone && { Icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    contact.email && { Icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { Icon: MessageCircle, label: 'WhatsApp', value: 'Message on WhatsApp', href: `https://wa.me/${contact.whatsapp}` },
    { Icon: MapPin, label: 'Region', value: contact.officeAddress ?? contact.region },
  ].filter(Boolean) as { Icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Let’s talk"
        title="My door"
        accent="is open."
        intro="A concern in your area, a project, an idea for Khed or a media request. Write to me and my team will make sure it reaches me."
        marathi="आपला कामेश, आपल्यासाठी"
        crumbs={[{ name: 'Let’s talk', path: '/contact/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-8 text-h3">Write to me</h2>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-[2rem] bg-ink p-8 text-paper sm:p-10">
              <h2 className="text-h3">Other ways to reach me</h2>
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
                <p className="eyebrow text-paper/60">Social</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 hover:text-bronze-light"><Instagram className="h-5 w-5" aria-hidden />{social.instagram.handle}</a>
                  <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 hover:text-bronze-light"><Facebook className="h-5 w-5" aria-hidden />{social.facebook.handle}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
