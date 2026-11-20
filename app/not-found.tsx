import Link from 'next/link';
import { uiEn } from '@/content/ui-en';
import { uiMr } from '@/content/ui-mr';

/** Bilingual 404 (static hosts serve one 404 page for every language). */
export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink text-paper">
      <div className="container-site py-24">
        <p className="eyebrow text-bronze-light">404</p>
        <h1 className="mt-4 text-h1">{uiEn.notFound.title}</h1>
        <p lang="mr" className="mt-2 font-serif text-h3 text-bronze-light">{uiMr.notFound.title}</p>
        <p className="mt-6 max-w-lg text-lead text-paper/70">{uiEn.notFound.text}</p>
        <p lang="mr" className="mt-2 max-w-lg text-lead text-paper/70">{uiMr.notFound.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-gold">{uiEn.notFound.back}</Link>
          <Link href="/mr/" lang="mr" className="btn-ghost-light">{uiMr.notFound.back}</Link>
        </div>
      </div>
    </section>
  );
}
