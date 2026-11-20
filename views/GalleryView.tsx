import PageHero from '@/components/PageHero';
import ProjectGallery from '@/components/ProjectGallery';
import { getContent, type Lang } from '@/content/i18n';
import { pageMeta } from '@/lib/seo';

export const galleryMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: '/gallery/',
    title: lang === 'mr' ? 'क्षणचित्रे | कामेश कांबळे' : 'Moments',
    description:
      lang === 'mr'
        ? 'कामेश कांबळे यांची क्षणचित्रे: बांधकाम साइट, बैठका, कार्यक्रम, सामाजिक उपक्रम आणि वैयक्तिक क्षण.'
        : 'Photographs of Kamesh Kamble at work: construction, meetings, public events, community activities and personal moments.',
  });

export default function GalleryView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const t = c.ui.gallery;
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro} crumbs={[{ name: c.nav[3].label, path: '/gallery/' }]} />
      <section className="section bg-paper">
        <div className="container-site">
          <ProjectGallery lang={lang} items={c.gallery} categories={c.galleryCategories} />
        </div>
      </section>
    </>
  );
}
