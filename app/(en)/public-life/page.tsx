import PublicLifeView, { publicLifeMeta } from '@/views/PublicLifeView';

export const metadata = publicLifeMeta('en');

export default function Page() {
  return <PublicLifeView lang="en" />;
}
