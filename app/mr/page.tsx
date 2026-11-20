import HomeView, { homeMeta } from '@/views/HomeView';

export const metadata = homeMeta('mr');

export default function Page() {
  return <HomeView lang="mr" />;
}
