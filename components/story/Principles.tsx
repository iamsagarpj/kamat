import { profile } from '@/content/site';
import Reveal from '../Reveal';

/** Big editorial list of what he believes. Rows slide and light up on hover/focus. */
export default function Principles() {
  return (
    <ol className="border-t border-ink/15">
      {profile.values.map((v, i) => (
        <Reveal as="li" key={v.title} delay={i * 0.06}>
          <div tabIndex={0} className="group grid gap-3 border-b border-ink/15 py-8 outline-none transition-colors duration-500 hover:bg-paper focus-visible:bg-paper md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 md:py-10">
            <span className="font-serif text-lg text-bronze-deep md:col-span-1">0{i + 1}</span>
            <h3 className="font-serif text-[clamp(1.8rem,1.3rem+2vw,3.2rem)] leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">
              {v.title}
            </h3>
            <p className="text-stone md:col-span-5">{v.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
