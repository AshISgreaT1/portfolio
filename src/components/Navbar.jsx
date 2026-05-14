import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import { useLenis } from '../hooks/useLenis.js';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Intro', href: '#intro' },
  { label: 'Skills', href: '#skills' },
  { label: 'AI Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = ['home', 'about', 'intro', 'skills', 'lab', 'contact'];

export default function Navbar() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (instance) => {
      if (instance.scroll < 48) setActive('home');
    };
    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.05, 0.12, 0.25] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  const scrollToHash = (e, href) => {
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(el, { offset: -96, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  const desktopLinkClass = (href) => {
    const id = href.slice(1);
    const isActive = active === id;
    return [
      'rounded-full px-3.5 py-2 text-sm transition',
      isActive ? 'bg-white/12 text-white shadow-[0_0_0_1px_rgba(79,220,255,0.25)]' : 'text-slate-300 hover:bg-white/10 hover:text-white',
    ].join(' ');
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-panel px-4 py-2.5 shadow-card backdrop-blur-xl sm:px-5 sm:py-3">
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-white"
          onClick={(e) => scrollToHash(e, '#home')}
        >
          {profile.name.split(' ')[0]}
          <span className="text-cyanGlow">.dev</span>
        </a>
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollToHash(e, link.href)} className={desktopLinkClass(link.href)}>
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          onClick={(e) => scrollToHash(e, '#contact')}
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:bg-cyanGlow lg:inline-flex"
        >
          Hire me
        </a>
        <button
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-panel p-3 backdrop-blur-xl lg:hidden"
        >
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className={`block rounded-2xl px-4 py-3 ${isActive ? 'bg-white/10 text-cyanGlow' : 'text-slate-200 hover:bg-white/10'}`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => scrollToHash(e, '#contact')}
            className="mt-2 block rounded-2xl bg-white py-3 text-center text-sm font-semibold text-ink"
          >
            Hire me
          </a>
        </motion.div>
      )}
    </header>
  );
}
