import { ImageIcon } from 'lucide-react';
import type { Photo } from '@/content/types';

/**
 * Renders an approved photo when `src` is set. Otherwise it renders a labelled,
 * on-brand placeholder so a missing image can never pass for a real one.
 */
export default function PhotoSlot({
  photo,
  className = '',
  tone = 'dark',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  monogram = false,
  zoom = false,
}: {
  photo: Photo;
  className?: string;
  tone?: 'dark' | 'light';
  priority?: boolean;
  sizes?: string;
  monogram?: boolean;
  zoom?: boolean;
}) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={`h-full w-full object-cover ${zoom ? 'transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]' : ''}`}
        />
      </div>
    );
  }

  const dark = tone === 'dark';
  const curved = /rounded-[bt]-\[999px\]/.test(className);
  return (
    <div
      role="img"
      aria-label={`${photo.alt} (photo to be added)`}
      className={`relative flex overflow-hidden ${
        dark ? 'bg-ink-800 text-paper/60' : 'bg-paper-200 text-ink/50'
      } ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? 'blueprint' : ''}`} aria-hidden />
      {!dark && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,22,36,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(14,22,36,0.045) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      )}
      <div
        aria-hidden
        className={`absolute inset-0 ${
          dark
            ? 'bg-gradient-to-br from-ink-700/40 via-transparent to-bronze/10'
            : 'bg-gradient-to-br from-paper/40 via-transparent to-bronze/10'
        } ${zoom ? 'transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]' : ''}`}
      />
      {monogram && (
        <span
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center font-serif text-[clamp(6rem,18vw,14rem)] leading-none ${
            dark ? 'text-bronze/20' : 'text-bronze/25'
          }`}
        >
          KK
        </span>
      )}
      <span className={`relative ${curved ? 'my-auto' : 'mt-auto'} flex w-full ${monogram ? 'justify-end' : curved ? 'justify-center' : ''} items-center gap-2 p-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] sm:p-4`}>
        <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className={curved ? 'text-center' : 'line-clamp-2'}>{photo.placeholderLabel ?? 'Photo to be added'}</span>
      </span>
    </div>
  );
}
