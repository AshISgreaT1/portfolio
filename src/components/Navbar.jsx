import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import { useLenis } from '../hooks/useLenis.js';
import GooeyNav from './GooeyNav.jsx';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Story', href: '#intro' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'AI Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = ['home', 'about', 'intro', 'skills', 'projects', 'experience', 'lab', 'contact'];

export default function Navbar() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (instance) => {
      if (instance.scroll < 48) setActive('home');
    };
    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      lenis.scrollTo(el, { offset: -80, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  const activeLinkIndex = links.findIndex((link) => link.href.slice(1) === active);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-500 ${
        scrolled ? 'top-3' : 'top-5'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[rgba(3,7,18,0.8)] px-5 py-3 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? 'border-white/15 shadow-lg shadow-black/20' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-xl font-bold text-white"
          onClick={(e) => scrollToHash(e, '#home')}
        >
          <Sparkles className="h-5 w-5 text-cyanGlow transition-transform duration-300 group-hover:scale-110" />
          <span>
            {profile.name.split(' ')[0]}
            <span className="text-cyanGlow">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation — GooeyNav */}
        <div className="hidden min-w-0 flex-1 justify-center overflow-hidden px-2 lg:flex">
          <GooeyNav
            className="gooey-nav--navbar"
            items={links}
            activeIndex={activeLinkIndex >= 0 ? activeLinkIndex : undefined}
            initialActiveIndex={0}
            particleCount={12}
            particleDistances={[70, 8]}
            particleR={80}
            animationTime={500}
            timeVariance={250}
            colors={[1, 2, 3, 2, 1, 4]}
            onItemClick={(e, _index, item) => scrollToHash(e, item.href)}
          />
        </div>

        {/* Hire Me Button */}
        <a
          href="#contact"
          onClick={(e) => scrollToHash(e, '#contact')}
          className="hidden rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyanGlow/25 lg:inline-flex"
        >
          Hire me
        </a>

        {/* Mobile Menu Button */}
        <button
          className="rounded-xl border border-white/10 p-2.5 text-white transition-all duration-300 hover:border-cyanGlow/50 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[rgba(3,7,18,0.95)] backdrop-blur-xl"
          >
            <div className="space-y-1 p-3">
              {links.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToHash(e, link.href)}
                    className={`block rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.08] text-cyanGlow'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => scrollToHash(e, '#contact')}
                className="mt-3 block rounded-xl bg-gradient-to-r from-cyanGlow to-violetGlow py-3.5 text-center text-base font-semibold text-white"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}