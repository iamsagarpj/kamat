/**
 * Makes link previews work on ANY domain that points at this site.
 *
 * The HTML is built once with one address baked into og:image, og:url, canonical,
 * hreflang and JSON-LD. Crawlers like WhatsApp and Facebook need full URLs there.
 * This edge function reads the address the page was built with (from og:url) and
 * swaps it for the address the request actually came in on. So the same deploy works
 * on kameshkamble.netlify.app, a custom domain, www or non-www, and deploy previews.
 *
 * Safe by design: if anything is unexpected it returns the page untouched.
 */
export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const response = await context.next();
  try {
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;

    const html = await response.text();
    const match = html.match(/<meta property="og:url" content="(https?:\/\/[^/"]+)/);
    const reqUrl = new URL(request.url);
    const origin = `${reqUrl.protocol === 'http:' && reqUrl.hostname !== 'localhost' ? 'https:' : reqUrl.protocol}//${reqUrl.host}`;

    if (!match || match[1] === origin) {
      return new Response(html, response);
    }
    const out = html.split(match[1]).join(origin);
    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    return new Response(out, { status: response.status, statusText: response.statusText, headers });
  } catch {
    return response;
  }
};

export const config = {
  path: '/*',
  excludedPath: [
    '/_next/*', '/assets/*', '/brand/*',
    '/*.jpg', '/*.jpeg', '/*.png', '/*.webp', '/*.svg', '/*.ico',
    '/*.webmanifest', '/*.xml', '/*.txt', '/*.js', '/*.css', '/*.woff2',
  ],
};
