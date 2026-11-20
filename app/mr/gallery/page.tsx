import GalleryView, { galleryMeta } from '@/views/GalleryView';

export const metadata = galleryMeta('mr');

export default function Page() {
  return <GalleryView lang="mr" />;
}
