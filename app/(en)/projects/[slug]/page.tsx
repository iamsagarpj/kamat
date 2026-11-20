import ProjectDetailView, { projectMeta, projectParams } from '@/views/ProjectDetailView';

export const dynamicParams = false;
export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return projectMeta('en', (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ProjectDetailView lang="en" slug={(await params).slug} />;
}
