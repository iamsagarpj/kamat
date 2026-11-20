import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'Kamesh Kamble | आपला कामेश | Khed, Satara', template: '%s | Kamesh Kamble' },
};

/** English pages live at the root URLs. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header lang="en" />
      <main id="main">{children}</main>
      <Footer lang="en" />
    </>
  );
}
