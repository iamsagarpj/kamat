import VenturesView, { venturesMeta } from '@/views/VenturesView';

export const metadata = venturesMeta('mr');

export default function Page() {
  return <VenturesView lang="mr" />;
}
