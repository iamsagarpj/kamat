import MediaView, { mediaMeta } from '@/views/MediaView';

export const metadata = mediaMeta('en');

export default function Page() {
  return <MediaView lang="en" />;
}
