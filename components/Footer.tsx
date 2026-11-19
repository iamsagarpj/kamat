import Link from 'next/link';
import { Instagram, Facebook } from './icons';
import { nav, profile, social, contact } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-800 text-paper/70">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-site relative pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p lang="mr" className="font-marathi text-2xl text-bronze-light">{profile.shortMarathi}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Zilla Parishad Member, Satara · Standing Committee member · Founder, Vijaya Construction. From {contact.region}.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 transition-colors hover:border-bronze hover:text-bronze-light">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 transition-colors hover:border-bronze hover:text-bronze-light">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-6">
            <div>
              <p className="eyebrow text-bronze-light">Explore</p>
              <ul className="mt-4 text-sm [&_a]:inline-flex [&_a]:min-h-[44px] [&_a]:min-w-[44px] [&_a]:items-center lg:[&_a]:min-h-[32px]">
                {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-paper">{n.label}</Link></li>)}
                <li><Link href="/projects/" className="hover:text-paper">Projects</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-bronze-light">Reach me</p>
              <ul className="mt-4 text-sm [&_a]:inline-flex [&_a]:min-h-[44px] [&_a]:min-w-[44px] [&_a]:items-center lg:[&_a]:min-h-[32px]">
                <li><Link href="/contact/" className="hover:text-paper">Write to me</Link></li>
                {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:text-paper">{contact.email}</a></li>}
                {contact.phone && <li><a href={`tel:${contact.phone}`} className="hover:text-paper">{contact.phone}</a></li>}
                <li><a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a></li>
                <li><a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Facebook</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <p aria-hidden className="mt-16 select-none whitespace-nowrap font-serif text-[clamp(2rem,12.4vw,13.5rem)] italic leading-[0.8] tracking-tight text-paper/[0.07]">
          Kamesh Kamble
        </p>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-8 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}</p>
          <p className="italic">{profile.motto}</p>
        </div>
      </div>
    </footer>
  );
}
