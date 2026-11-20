import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'कामेश कांबळे | आपला कामेश', template: '%s' },
};

/** Marathi pages live under /mr/. Everything inside is marked lang="mr" for screen readers and search engines. */
export default function MarathiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="mr" className="lang-mr">
      <Header lang="mr" />
      <main id="main">{children}</main>
      <Footer lang="mr" />
    </div>
  );
}
