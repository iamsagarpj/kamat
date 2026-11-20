/**
 * Works out the site's public address at build time, on any host, so link previews
 * (WhatsApp, Facebook, X), canonical URLs and the sitemap always use the real domain.
 * Nothing here is tied to one domain. First match wins:
 *   1. NEXT_PUBLIC_SITE_URL  (set it yourself to force a domain)
 *   2. Netlify   URL                          (custom domain if one is set, else *.netlify.app)
 *   3. Vercel    VERCEL_PROJECT_PRODUCTION_URL
 *   4. Cloudflare Pages CF_PAGES_URL
 *   5. Render    RENDER_EXTERNAL_URL
 *   6. local     http://localhost:3000
 * On Netlify, netlify/edge-functions/site-origin.ts also swaps in whatever domain a
 * visitor (or WhatsApp) actually used, so a newly added domain works without a rebuild.
 */
function siteOrigin() {
  const e = process.env;
  const raw =
    e.NEXT_PUBLIC_SITE_URL ||
    e.URL ||
    e.VERCEL_PROJECT_PRODUCTION_URL ||
    e.CF_PAGES_URL ||
    e.RENDER_EXTERNAL_URL ||
    'http://localhost:3000';
  const withScheme = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/+$/, '');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_SITE_URL: siteOrigin() },
};
export default nextConfig;
