import ContactView, { contactMeta } from '@/views/ContactView';

export const metadata = contactMeta('mr');

export default function Page() {
  return <ContactView lang="mr" />;
}
