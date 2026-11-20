import PublicLifeView, { publicLifeMeta } from '@/views/PublicLifeView';

export const metadata = publicLifeMeta('mr');

export default function Page() {
  return <PublicLifeView lang="mr" />;
}
