import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Download, Code2, Network } from 'lucide-react';
import { profile } from '../data/portfolio.js';

const DeveloperScene = lazy(() => import('./scene/DeveloperScene.jsx'));

export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(glowRef.current, {
        opacity: 0.95,
        scale: 1.08,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen px-4 pb-20 pt-32 sm:pt-40">
      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyanGlow/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-5 inline-flex rounded-full border border-cyanGlow/20 bg-cyanGlow/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyanGlow">
            Internship portfolio 2026
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-300 sm:text-2xl">{profile.role}</p>
          <p className="mt-5 max-w-2xl leading-8 text-slate-400">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#skills" className="rounded-full bg-cyanGlow px-6 py-3 text-sm font-bold text-ink shadow-neon transition hover:-translate-y-1 hover:bg-white">
              View skills
            </a>
            <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:border-cyanGlow/50">
              <Download size={16} /> Resume
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyanGlow">
              <Code2 size={18} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyanGlow">
              <Network size={18} />
            </a>
          </div>
          <div className="mt-10 max-w-2xl rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.28em] text-cyanGlow">Currently studying</p>
            <a
              href={profile.college.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-display text-2xl font-bold text-white transition hover:text-cyanGlow"
            >
              {profile.college.shortName}
            </a>
            <p className="mt-2 text-sm leading-7 text-slate-400">{profile.college.details}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,220,255,.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,.18),transparent_36%),#050816] shadow-card backdrop-blur md:h-[540px]">
          <Suspense fallback={<div className="grid h-full place-items-center text-sm text-slate-500">Loading 3D scene...</div>}>
            <DeveloperScene />
          </Suspense>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-cyanGlow md:block" aria-label="Scroll to about section">
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
