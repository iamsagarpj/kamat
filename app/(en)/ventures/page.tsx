import VenturesView, { venturesMeta } from '@/views/VenturesView';

export const metadata = venturesMeta('en');

export default function Page() {
  return <VenturesView lang="en" />;
}
