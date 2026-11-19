import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Business } from '@/content/types';
import PhotoSlot from './PhotoSlot';

export default function BusinessCard({ business, index = 0 }: { business: Business; index?: number }) {
  return (
    <Link href={`/ventures/${business.slug}/`} className="group block h-full border border-ink/10 bg-paper transition-colors duration-500 hover:border-bronze">
      <PhotoSlot photo={business.cover} tone="light" zoom className="aspect-[16/10] w-full" sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-bronze-deep">{String(index + 1).padStart(2, '0')} · {business.role}</p>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-deep" aria-hidden />
        </div>
        <h3 className="mt-3 text-h3">{business.name}</h3>
        <p className="mt-2 text-sm text-stone">{business.category}</p>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-stone">{business.summary}</p>
      </div>
    </Link>
  );
}
