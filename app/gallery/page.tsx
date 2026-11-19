import PageHero from '@/components/PageHero';
import ProjectGallery from '@/components/ProjectGallery';
import { gallery, galleryCategories } from '@/content/gallery';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Moments',
  description: 'Photographs of Kamesh Kamble at work: construction, meetings, public events, community activities and personal moments.',
  path: '/gallery/',
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Moments with"
        accent="my people."
        intro="On site, in meetings, at events and in the neighbourhoods I serve."
        crumbs={[{ name: 'Moments', path: '/gallery/' }]}
      />
      <section className="section bg-paper">
        <div className="container-site">
          <ProjectGallery items={gallery} categories={galleryCategories} />
        </div>
      </section>
    </>
  );
}
