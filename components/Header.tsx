'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav, profile, social } from '@/content/site';
import Magnetic from './motion/Magnetic';
import LogoMark from './brand/LogoMark';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        open
          ? 'bg-ink py-3 shadow-[0_1px_0_rgba(214,186,140,0.15)]'
          : scrolled
            ? 'bg-ink/95 py-3 shadow-[0_1px_0_rgba(214,186,140,0.15)] backdrop-blur'
            : 'bg-transparent py-5'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between gap-6">
        <Link href="/" className="group flex min-h-[44px] items-center gap-3 text-paper" aria-label={`${profile.name}, home`}>
          <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 sm:h-12 sm:w-12" title="" />
          <span className="font-serif text-[1.35rem] italic leading-none tracking-tight transition-colors group-hover:text-bronze-light sm:text-2xl">
            Kamesh Kamble
          </span>
          <span lang="mr" className="hidden font-marathi text-sm text-bronze-light/80 sm:inline">{profile.shortMarathi}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'text-bronze-light' : 'text-paper/80 hover:text-paper'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-bronze-light" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:inline-flex">
            <Link href="/contact/" className="btn-gold min-h-[44px]">
              Let’s talk
            </Link>
          </Magnetic>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-paper lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-10 pt-6">
              <ul className="divide-y divide-paper/10 border-y border-paper/10">
                {[{ href: '/', label: 'Home' }, ...nav, { href: '/contact/', label: 'Let’s talk' }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={(item.href === '/' ? pathname === '/' : isActive(item.href)) ? 'page' : undefined}
                      className="flex items-center justify-between py-4 font-serif text-[1.75rem] text-paper"
                    >
                      {item.label}
                      <ArrowUpRight className="h-5 w-5 text-bronze-light" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-10 text-sm text-paper/60">
                <p className="font-marathi text-lg text-bronze-light">{profile.shortMarathi}</p>
                <div className="mt-4 flex gap-6">
                  <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
                  <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Facebook</a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
