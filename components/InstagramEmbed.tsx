'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Instagram } from './icons';

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

/**
 * Click-to-load official Instagram embed. Nothing loads from Instagram
 * until the visitor asks for it, which keeps the page fast and private.
 */
export default function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!load) return;
    if (window.instgrm) return window.instgrm.Embeds.process();
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }, [load]);

  if (!load) {
    return (
      <div className="flex aspect-[4/5] max-h-[560px] w-full flex-col justify-between border border-ink/10 bg-paper-200 p-8">
        <Instagram className="h-6 w-6 text-bronze-deep" aria-hidden />
        <div>
          <p className="font-serif text-2xl leading-snug">{title}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setLoad(true)} className="btn-ink">Load Instagram post</button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">Open on Instagram <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ margin: 0, width: '100%', minWidth: 0 }}>
      <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
    </blockquote>
  );
}
