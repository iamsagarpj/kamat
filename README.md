# kamat · Kamesh Kamble: Personal Brand Website

Next.js 15 (App Router, static export) · Tailwind CSS · Framer Motion · Lucide icons. No backend or database: the whole site is static HTML that can be hosted anywhere.

Research findings and the verified-facts inventory are in [`docs/RESEARCH.md`](docs/RESEARCH.md).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build                # static site generated in /out
```

Requires Node 18.18 or newer. TypeScript is pinned to 5.x because Next 15 does not support TypeScript 7.

## Design and motion (v2: personal theme)

The site presents **one person**, not a firm: warm charcoal, cream and bronze; Fraunces display type with Marathi accents; and copy written in his own voice (first person). The draft wording in `content/site.ts` (`story`, `values`) and `content/activities.ts` must be approved by Kamesh sir before launch.

Motion (all in `components/motion/` and `globals.css`):
- Hero: letter-by-letter name entrance, rotating roles, pointer-follow spotlight, spinning "आपला कामेश" badge, parallax portrait, scroll cue.
- Word-by-word headline reveals and "dim to bright" statements.
- A sticky "Three roles" chapter whose numeral follows the panel in view.
- A milestone line that draws itself as you scroll.
- Marquee band, horizontal swipeable moments strip, magnetic buttons, reading-progress bar, soft page transitions.

Everything is progressive enhancement: content is in the HTML without JavaScript, and `prefers-reduced-motion` switches all motion off.

## English and Marathi (मराठी)

The site is fully bilingual. English is at the normal addresses (`/about/`), Marathi under `/mr/` (`/mr/about/`). The **मराठी / English** button in the header switches to the same page in the other language.

| What | Where |
|---|---|
| Buttons, menus, headings, form messages | `content/ui-en.ts` and `content/ui-mr.ts` (same shape, side by side) |
| His story, roles, focus areas, values, milestones, activities, business and gallery text in Marathi | `content/mr.ts` |
| English story content | `content/site.ts`, `content/activities.ts`, `content/businesses.ts`, `content/gallery.ts` |
| Page layouts (shared by both languages) | `views/*View.tsx` |
| Routes | `app/(en)/…` (English) and `app/mr/…` (Marathi), each a two-line file |

Marathi is written in his own voice, in everyday Khed-Satara Marathi rather than formal translation. **Have Kamesh sir or someone from his team read it once before launch.**

Details handled for Marathi: Devanagari fonts (Tiro Devanagari Marathi for headings, Mukta for text), extra line height so matras are never clipped, no letter-spacing or fake italics on Devanagari, Devanagari numerals (२०२३) and Marathi dates (१६ नोव्हेंबर २०२६), `lang="mr"` on every Marathi page, and `hreflang` links plus both languages in `sitemap.xml` so Google shows the right version to Marathi searchers.

When you add a new activity or gallery photo, add its Marathi text in `content/mr.ts` too (activities are matched by the post URL, gallery items by order). If you forget, the English text shows on the Marathi page instead of breaking.

## Brand: logo and favicon

The **KK monogram** pairs an upright K and an italic K (echoing "Kamesh" / "Kamble." in the hero) inside the arch used for his portrait, with a four-point star at the top. Letters are real outlines from the site's Fraunces typeface, so files need no fonts.

| File | Use |
|---|---|
| `public/favicon.ico`, `favicon.svg` | Browser tab icon (16px version simplified to a bold K) |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest` | Phone home-screen and app icons |
| `public/og-image.jpg`, `public/og-image-mr.jpg` | Link preview card when the site is shared (WhatsApp, Facebook, X). English and Marathi |
| `public/brand/kk-mark-*.svg/.png` | Monogram alone (dark, light, gold on transparent) |
| `public/brand/kk-lockup-*.svg/.png` | Monogram + "Kamesh Kamble" + "आपला कामेश", horizontal (letterheads, banners, email signature) |
| `public/brand/kk-stacked-*.svg/.png` | Stacked version (posters, print) |
| `public/brand/kk-profile-picture-1080.png` | Square profile picture for Instagram / Facebook / WhatsApp |
| `components/brand/LogoMark.tsx` | The monogram as a React component (header, footer) |

Brand colours: charcoal `#16120E`, cream `#F6F1E9`, bronze `#C08A4A`, light bronze `#E0B87F`.

## Pages

| Route | Purpose |
|---|---|
| `/` and `/mr/` | Home, told in chapters: hero, who I am, three roles, in the community, the road so far + what I believe, moments, let's talk |
| `/about/` | My Story: three first-person chapters, motto, beliefs, milestones |
| `/ventures/` and `/ventures/[slug]/` | All businesses; one detail page per business (overview, services, ongoing/completed projects, enquiry) |
| `/projects/` and `/projects/[slug]/` | Project portfolio and detail pages (honest empty state until projects are verified) |
| `/public-life/` | Timeline of verified public activities, each linked to its source post |
| `/gallery/` | Masonry gallery with 5 category filters and a keyboard-accessible lightbox |
| `/media/` | Social profiles, click-to-load Instagram embeds, activity list |
| `/contact/` | Contact form plus direct channels (shown only when provided) |

## Updating content (no UI code changes needed)

All content lives in `/content`:

| File | What it controls |
|---|---|
| `site.ts` | Name, roles, tagline, intro, values, navigation, social links, phone/email/WhatsApp/address |
| `businesses.ts` | Ventures. Add an object to create a new card and its `/ventures/<slug>/` page |
| `projects.ts` | Projects. Add an object (template in the file) to create a card and its detail page |
| `activities.ts` | Public-life timeline and the "recent updates" list |
| `gallery.ts` | Gallery images and categories |

Every business, project and activity has a `verified` flag. Unverified entries never render.

### Adding photos

1. Export as **WebP** (or AVIF), with the long edge around 2000px for hero/portrait images and 1600px for others. Aim for under 300 KB each. (`npx @squoosh/cli` or https://squoosh.app work well.)
2. Put the files in the matching folder: `public/assets/{profile,businesses,projects,gallery,events,social}/`.
3. Set `src` (and ideally `width`/`height`) on the relevant entry, e.g. in `site.ts`:
   `portrait: { src: '/assets/profile/portrait.webp', alt: 'Kamesh Kamble', width: 1600, height: 2000 }`.
4. Until `src` is set, a labelled placeholder appears. A placeholder can never be mistaken for a real photo, and no AI-generated portraits are used.

### Going further (optional CMS)

When non-technical editors need to update the site, add **Decap CMS** (Git-based, free, works with Netlify). It edits the same content as JSON/Markdown and needs no database. That's the simplest maintainable next step. A Postgres/FastAPI admin isn't needed at this size.

## Contact form

The site is static, so the form posts to **Web3Forms** (free):

1. Create an access key at https://web3forms.com using the official inbox email.
2. Set `NEXT_PUBLIC_WEB3FORMS_KEY=...` in `.env.local` or in your host's environment variables, then rebuild.

Without a key, the form validates input and then states plainly that it's **not connected and the message was not sent**. It never fakes a success. It has spam protection (honeypot), labelled fields, inline errors and an `aria-live` status.

WhatsApp: set `contact.whatsapp` (digits only, with country code, e.g. `9198XXXXXXXX`) in `content/site.ts`. A WhatsApp row then appears on the contact page.

## SEO

- Unique titles, descriptions and canonical URLs per page (`lib/seo.ts`).
- Open Graph and Twitter card metadata, with `public/og-image.jpg` and `public/og-image-mr.jpg` (1200×630 JPG, under 300 KB). The card's image link is a full URL that always matches the domain the page is opened on, so it works on any domain.
- `sitemap.xml` and `robots.txt` generated at build time from content (unpublished items are excluded).
- JSON-LD: `Person`, `WebSite`, `Organization` (Vijaya Construction), and `BreadcrumbList` on every inner page. There's deliberately no `LocalBusiness`, address, rating or review markup until verified data exists.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before the production build.
- Copy says "Khed, Satara" throughout to avoid confusion with Khed in Ratnagiri and Pune districts.

## Performance and accessibility

- Self-hosted fonts (Fraunces, Manrope, Tiro Devanagari Marathi) via Fontsource: no third-party font requests.
- Content is visible in the server HTML. Scroll reveals are progressive enhancement and are switched off for `prefers-reduced-motion`.
- Images are lazy-loaded except the hero; Instagram embeds load only on click.
- Skip link, visible focus styles, `aria-current` navigation, 44px+ touch targets, Esc and arrow-key support in the lightbox and menu.
- Tested for horizontal overflow at 320, 390, 768, 1366 and 1920px widths.

## Deployment

### Netlify (recommended, config included)

`netlify.toml` is in the repo, so Netlify needs no manual build settings:

1. In Netlify: **Add new site → Import an existing project → GitHub →** pick `iamsagarpj/kamat`.
2. Netlify reads `netlify.toml`: build command `npm run build`, publish folder `out`, Node 22.
3. Under **Site configuration → Environment variables**, add:
   - `NEXT_PUBLIC_SITE_URL` is optional. The site address is detected automatically on Netlify, Vercel, Cloudflare Pages and Render (see `next.config.mjs`), and on Netlify the edge function `netlify/edge-functions/site-origin.ts` rewrites preview and canonical links to whatever domain the page is opened on. Set it only to force one address.
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = your Web3Forms key (contact form)
4. Deploy. Every push to `main` redeploys automatically.
5. Add the custom domain under **Domain management**; HTTPS is automatic.

The config also sets long-term caching for build assets, basic security headers and the custom 404 page. `NETLIFY_NEXT_PLUGIN_SKIP` keeps Netlify's Next.js server plugin out of the way, because this site is a pure static export.

### Other hosts

**Vercel:** import the repo; framework Next.js; add the environment variables; deploy.

**Any static host / cPanel:** run `npm run build` and upload the contents of `out/`.

After deploying, submit `https://<domain>/sitemap.xml` in Google Search Console and verify ownership.

## Project structure

```
app/            routes, sitemap.ts, robots.ts, layout, global styles
components/     Header, Footer, HeroSection, AboutSection, BusinessCard, ProjectCard,
                ProjectGallery, SocialMediaSection, ContactForm, CTASection,
                ActivityTimeline, PageHero, PhotoSlot, Reveal, SectionHeading, InstagramEmbed
content/        all editable content and types
lib/seo.ts      metadata and structured-data helpers
public/assets/  organised image folders
docs/           research document
```

## Information still needed from the client

1. Approved portrait and event/site photographs (originals, with permission to use them).
2. Vijaya Construction: confirmed services, logo, office address, and project list with photos and dates.
3. Names and details of any other businesses.
4. ZP constituency/gat name, term, and Standing Committee details; development works to highlight (documented only).
5. A bio in his own words; approval of the tagline "Building Khed. Serving Satara."
6. Official phone, email, WhatsApp Business number and office address.
7. Contact-form destination email (for the Web3Forms key).
8. Domain name.
9. Whether a Marathi version is wanted at launch.
10. Guidance on how prominently to show the ZP role alongside a government-contracting business (see RESEARCH.md §5).
