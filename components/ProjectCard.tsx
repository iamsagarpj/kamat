import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Project } from '@/content/types';
import PhotoSlot from './PhotoSlot';

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}/`} className="group relative block overflow-hidden bg-ink text-paper">
      <PhotoSlot photo={project.cover} zoom className={`w-full ${large ? 'aspect-[4/5] md:aspect-[16/11]' : 'aspect-[4/5]'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className={`px-2.5 py-1 font-semibold uppercase tracking-wider ${project.status === 'Ongoing' ? 'bg-bronze text-ink' : 'border border-paper/40'}`}>
            {project.status}
          </span>
          <span className="text-paper/70">{project.category}</span>
        </div>
        <h3 className="mt-3 text-h3">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-paper/70"><MapPin className="h-3.5 w-3.5" aria-hidden />{project.location}</p>
      </div>
    </Link>
  );
}
