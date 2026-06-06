import { Code2, Network, Sparkles, Heart } from 'lucide-react';
import { profile } from '../data/portfolio.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] px-4 py-16">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[200px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanGlow/3 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Info */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <a href="#home" className="group flex items-center gap-2 font-display text-xl font-bold text-white">
              <Sparkles className="h-5 w-5 text-cyanGlow" />
              <span>
                {profile.name.split(' ')[0]}
                <span className="text-cyanGlow">.dev</span>
              </span>
            </a>
            <p className="text-sm text-slate-400">
              Building the future, one component at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-cyanGlow/50 hover:bg-white/[0.08] hover:text-cyanGlow"
              title="GitHub"
            >
              <Code2 size={18} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-cyanGlow/50 hover:bg-white/[0.08] hover:text-cyanGlow"
              title="LinkedIn"
            >
              <Network size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-slate-500">
            Copyright {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            Built with <Heart className="h-4 w-4 text-pinkGlow" /> using React, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
