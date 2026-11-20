'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { profile, story } from '@/content/site';
import PhotoSlot from './PhotoSlot';
import Magnetic from './motion/Magnetic';
import Odometer from './motion/Odometer';

function Letters({ word, offset = 0, className = '' }: { word: string; offset?: number; className?: string }) {
  return (
    <span className={`block ${className}`} aria-hidden>
      {word.split('').map((ch, i) => (
        <span key={i} className="letter" style={{ '--i': i + offset } as CSSProperties}>{ch}</span>
      ))}
    </span>
  );
}

/** Rotating circular badge around the portrait. */
function Badge() {
  const text = ' आपला कामेश  ✦  VOICE OF KHED  ✦  FOR THE PEOPLE  ✦ ';
  return (
    <svg viewBox="0 0 200 200" className="spin-slow h-full w-full" aria-hidden>
      <defs><path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text className="fill-bronze-light" style={{ fontSize: 13.5, letterSpacing: 3, fontFamily: 'Manrope Variable, sans-serif', fontWeight: 600 }}>
        <textPath href="#circle">{text}</textPath>
      </text>
    </svg>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // Scroll-linked drift only on large screens; phones and tablets keep a calm, stable hero.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const drift = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % story.heroRoles.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  const spotlight = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      onPointerMove={spotlight}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink text-paper"
      style={{ '--mx': '75%', '--my': '30%' } as CSSProperties}
    >
      <div className="grain absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={{ background: 'radial-gradient(600px circle at var(--mx) var(--my), rgba(192,138,74,0.16), transparent 60%)' }}
      />

      <div className="container-site grid min-h-[100svh] content-center gap-y-6 pb-20 pt-24 sm:gap-y-8 sm:pb-24 sm:pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pt-28">
        {/* Intro */}
        <div className="order-1 lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <p className="rise eyebrow flex items-center gap-3 text-bronze-light" style={{ animationDelay: '0.1s' }}>
            <span className="rule" aria-hidden />
            Khed, Satara
          </p>
          <p lang="mr" className="rise mt-6 font-marathi text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-bronze-light" style={{ animationDelay: '0.2s' }}>
            {story.greeting}
          </p>
        </div>

        {/* Name */}
        <motion.h1
          id="hero-title"
          aria-label={profile.name}
          style={drift ? { x: nameX } : undefined}
          className="relative z-10 order-2 font-serif text-mega lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:-mt-2"
        >
          <Letters word="Kamesh" />
          <Letters word="Kamble." offset={6} className="italic text-bronze-light pl-[8vw] lg:pl-[4vw]" />
        </motion.h1>

        {/* Line + roles + CTAs */}
        <div className="relative z-10 order-4 lg:order-none lg:col-span-6 lg:col-start-6 lg:row-start-3">
          <p className="rise flex flex-wrap gap-x-4 gap-y-1 font-serif text-[clamp(1.25rem,1rem+0.9vw,1.75rem)]" style={{ animationDelay: '0.7s' }}>
            {story.heroRoles.map((r, i) => (
              <span key={r} className={`transition-colors duration-700 ${i === active ? 'text-paper' : 'text-paper/30'}`}>
                {r}{i < story.heroRoles.length - 1 ? <span className="text-bronze">.</span> : <span className="text-bronze">.</span>}
              </span>
            ))}
          </p>
          <p className="rise mt-5 max-w-xl text-lead text-paper/70" style={{ animationDelay: '0.8s' }}>
            {story.heroLine}
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.9s' }}>
            <Magnetic>
              <Link href="/about/" className="btn-gold group w-full sm:w-auto">
                Explore my journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Magnetic>
            <Link href="/contact/" className="btn-ghost-light">Connect with me</Link>
          </div>
          <p className="rise mt-8 flex items-center gap-2 text-sm text-paper/55" style={{ animationDelay: '1s' }}>
            <MapPin className="h-4 w-4 text-bronze-light" aria-hidden /> {profile.roles[0].title}, {profile.roles[0].org}
          </p>
        </div>

        {/* Portrait */}
        <motion.div
          style={drift ? { y: portraitY, opacity: fade } : undefined}
          className="settle relative order-3 mx-auto my-6 w-[84%] max-w-[22rem] sm:max-w-sm md:my-10 md:max-w-[26rem] lg:order-none lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:my-0 lg:w-full lg:max-w-[min(100%,calc((100svh-13rem)*0.8))] lg:self-center lg:justify-self-start"
        >
          <div className="relative overflow-hidden rounded-t-[999px]">
            <PhotoSlot photo={profile.portrait} priority monogram className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 26rem, 84vw" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-t-[999px] ring-1 ring-inset ring-bronze-light/25" />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden h-32 w-32 sm:block md:-left-12 md:h-40 md:w-40 lg:-left-10">
            <Badge />
          </div>
          <div className="absolute -bottom-6 -right-3 w-40 border border-paper/10 bg-ink/90 p-4 backdrop-blur sm:-right-4 sm:w-52 sm:p-5 md:w-44 md:p-4 lg:w-56 lg:p-6">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-paper/60">Building Khed since</p>
            <p className="mt-2 font-serif text-4xl text-paper sm:text-5xl md:text-4xl lg:text-6xl"><Odometer value="2023" /></p>
            <p className="mt-3 text-xs leading-relaxed text-paper/60">Founded Vijaya Construction</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 lg:right-12 text-[0.65rem] uppercase tracking-[0.3em] text-paper/40 md:flex" aria-hidden>
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-paper/15"><span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-bronze-light" /></span>
      </div>
    </section>
  );
}
