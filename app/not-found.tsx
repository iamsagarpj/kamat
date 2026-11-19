import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink text-paper">
      <div className="container-site pt-24">
        <p className="eyebrow text-bronze-light">404</p>
        <h1 className="mt-4 text-h1">This page isn’t here.</h1>
        <p className="mt-4 max-w-lg text-lead text-paper/70">It may have moved, or it hasn’t been published yet.</p>
        <Link href="/" className="btn-gold mt-10">Back to home</Link>
      </div>
    </section>
  );
}
