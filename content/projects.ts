import type { Project } from './types';

/**
 * Project portfolio. No projects have been verified yet, so the list is empty
 * and the site shows a "portfolio in preparation" state instead of dummy work.
 *
 * To add a project, copy this shape:
 * {
 *   slug: 'khed-road-works-2025',
 *   title: 'Road works, Khed',
 *   location: 'Khed, Satara',
 *   category: 'Infrastructure',
 *   status: 'Completed',
 *   businessSlug: 'vijaya-construction',
 *   description: ['Paragraph one', 'Paragraph two'],
 *   completionDate: '2025-03',
 *   cover: { src: '/assets/projects/khed-road/cover.webp', alt: 'Finished road at Khed' },
 *   photos: [{ src: '/assets/projects/khed-road/1.webp', alt: '...' }],
 *   verified: true,
 * }
 */
export const projects: Project[] = [];

export const liveProjects = projects.filter((p) => p.verified);
export const getProject = (slug: string) => liveProjects.find((p) => p.slug === slug);
export const projectsForBusiness = (slug: string) => liveProjects.filter((p) => p.businessSlug === slug);
