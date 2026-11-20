import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/manrope';
import '@fontsource/tiro-devanagari-marathi/400.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { personSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Kamesh Kamble | ZP Member, Satara & Owner of Vijaya Construction',
    template: '%s | Kamesh Kamble',
  },
  description: site.defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#16120E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
