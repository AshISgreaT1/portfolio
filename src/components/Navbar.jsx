import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/portfolio.js';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Intro', href: '#intro' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-panel px-5 py-3 shadow-card backdrop-blur-xl">
        <a href="#home" onClick={closeMenu} className="font-display text-lg font-bold tracking-tight text-white">
          {profile.name.split(' ')[0]}<span className="text-cyanGlow">.dev</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:bg-cyanGlow md:inline-flex">
          Hire me
        </a>
        <button
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
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
          className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-panel p-3 backdrop-blur-xl md:hidden"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="block rounded-2xl px-4 py-3 text-slate-200 hover:bg-white/10">
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
