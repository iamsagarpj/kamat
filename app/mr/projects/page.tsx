import ProjectsView, { projectsMeta } from '@/views/ProjectsView';

export const metadata = projectsMeta('mr');

export default function Page() {
  return <ProjectsView lang="mr" />;
}
