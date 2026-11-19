import type { Activity } from './types';

/**
 * Public activities taken from Kamesh Kamble's own Instagram posts (verified 19 Nov 2026).
 * Summaries are written in English, in his voice (draft for approval), from his Marathi captions; each links to the original post.
 * Add `photo` once approved stills are available.
 */
export const activities: Activity[] = [
  {
    date: '2026-11-16',
    title: 'Listening to residents at Vikasnagar',
    summary:
      'I met residents of Krushnai Vandan Apartment, Vikasnagar. They raised drainage, roads, street lighting and public seating, and I committed to taking these up on priority.',
    theme: 'Public Service',
    place: 'Vikasnagar, Satara',
    sourceUrl: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/p/Df06BbJkz-a/',
    verified: true,
  },
  {
    date: '2026-11-07',
    title: 'Student Day at Pratapsinh High School',
    summary:
      'As a Zilla Parishad member, I joined the Student Day programme organised by Satara ZP with its Education and Social Welfare departments, and spoke about Dr. Babasaheb Ambedkar’s message on education and equal opportunity.',
    theme: 'Education',
    place: 'Pratapsinh High School, Satara',
    sourceUrl: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DfcUWEWzgGB/',
    verified: true,
  },
  {
    date: '2026-11-01',
    title: 'Satara District Central Co-operative Bank election',
    summary:
      'I voted in the board election of the Satara District Central Co-operative Bank, alongside the State Public Works Minister, Shrimant Chhatrapati Shivendraraje Bhosale.',
    theme: 'Co-operative Sector',
    place: 'Satara',
    sourceUrl: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DfMz0AmtcGV/',
    verified: true,
  },
  {
    date: '2026-06-14',
    title: 'Open Turf Cricket Night tournament',
    summary:
      'I organised an open turf cricket night tournament at Turf Nest, Satara–Koregaon Road, and was there for the final and the prize distribution.',
    theme: 'Youth & Sports',
    place: 'Sangam Mahuli Phata, Satara',
    sourceUrl: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DZl6aokCcr9/',
    verified: true,
  },
];

export const liveActivities = activities
  .filter((a) => a.verified)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
