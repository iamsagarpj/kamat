import AboutView, { aboutMeta } from '@/views/AboutView';

export const metadata = aboutMeta('mr');

export default function Page() {
  return <AboutView lang="mr" />;
}
