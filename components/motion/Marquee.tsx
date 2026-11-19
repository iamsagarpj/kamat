/** Endless ticker band. Pauses on hover; static for reduced motion. */
export default function Marquee({ items, tone = 'bronze' }: { items: { text: string; lang?: string }[]; tone?: 'bronze' | 'ink' }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} lang={it.lang} className={`flex items-center whitespace-nowrap px-6 sm:px-10 ${it.lang === 'mr' ? 'font-marathi' : 'font-serif italic'} text-[clamp(1.6rem,1rem+2.4vw,3.2rem)]`}>
          {it.text}
          <span className="ml-12 text-[0.6em] not-italic opacity-60 sm:ml-20" aria-hidden>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee-wrap overflow-hidden py-6 sm:py-8 ${tone === 'bronze' ? 'bg-bronze text-ink' : 'bg-ink text-bronze-light'}`}>
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
