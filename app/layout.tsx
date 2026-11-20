import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/manrope';
import '@fontsource/tiro-devanagari-marathi/400.css';
import '@fontsource/mukta/devanagari-400.css';
import '@fontsource/mukta/devanagari-500.css';
import '@fontsource/mukta/devanagari-600.css';
import './globals.css';
import ScrollProgress from '@/components/motion/ScrollProgress';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { personSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Kamesh Kamble | ZP Member, Satara & Owner of Vijaya Construction',
    template: '%s',
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
        {/* JS flag for progressive animations; Marathi pages (/mr/) set the document language to Marathi */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');if(/^\\/mr(\\/|$)/.test(location.pathname)){document.documentElement.lang='mr-IN'}",
          }}
        />
      </head>
      <body>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
