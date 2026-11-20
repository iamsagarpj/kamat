import VentureDetailView, { ventureMeta, ventureParams } from '@/views/VentureDetailView';

export const dynamicParams = false;
export const generateStaticParams = ventureParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return ventureMeta('mr', (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <VentureDetailView lang="mr" slug={(await params).slug} />;
}
