import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'light',
  align = 'left',
  as: H = 'h2',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  const dark = tone === 'dark';
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-bronze-light' : 'text-bronze-deep'}`}>
        <span className="rule" aria-hidden />
        {eyebrow}
      </p>
      <H className={`mt-5 ${H === 'h1' ? 'text-h1' : 'text-h2'} ${dark ? 'text-paper' : 'text-ink'}`}>{title}</H>
      {intro && <p className={`mt-6 text-lead ${dark ? 'text-paper/70' : 'text-stone'}`}>{intro}</p>}
    </Reveal>
  );
}
