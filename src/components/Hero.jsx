import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Download, Code2, Network } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import TypingAnimation from './TypingAnimation.jsx';

const DeveloperScene = lazy(() => import('./scene/DeveloperScene.jsx'));

export default function Hero() {
  const glowRef = useRef(null);
  const containerRef = useRef(null);

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
    }, containerRef);
    return () => context.revert();
  }, []);

  const heroRoles = ['Frontend Developer', 'Full-Stack Explorer', 'Tech Enthusiast'];

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen px-4 pb-20 pt-32 sm:pt-40 overflow-hidden">
      {/* Animated glow */}
      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyanGlow/20 blur-3xl" />
      
      {/* Secondary glow */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
        animate={{
          y: [0, 50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            className="mb-5 inline-flex rounded-full border border-cyanGlow/20 bg-cyanGlow/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyanGlow"
            animate={{
              borderColor: ['rgba(79, 220, 255, 0.2)', 'rgba(79, 220, 255, 0.4)', 'rgba(79, 220, 255, 0.2)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✨ Internship Portfolio 2026
          </motion.div>

          {/* Main heading */}
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>

          {/* Typing role animation */}
          <motion.div
            className="mt-5 max-w-2xl text-xl text-cyan-300 sm:text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypingAnimation words={heroRoles} speed={80} delayBetweenWords={2500} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-5 max-w-2xl leading-8 text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.a
              href="#skills"
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 group-hover:from-cyan-400 group-hover:to-cyan-500 transition-all duration-300" />
              <span className="relative text-white">View Skills</span>
            </motion.a>

            <motion.a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:border-cyan-400/50 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} /> Resume
            </motion.a>

            <motion.a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyan-300 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="GitHub"
            >
              <Code2 size={18} />
            </motion.a>

            <motion.a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyan-300 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="LinkedIn"
            >
              <Network size={18} />
            </motion.a>
          </motion.div>

          {/* College info card */}
          <motion.div
            className="mt-10 max-w-2xl rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-5 backdrop-blur group hover:border-cyan-400/50 transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
            <p className="relative text-sm uppercase tracking-[0.28em] text-cyanGlow">Currently studying</p>
            <a
              href={profile.college.url}
              target="_blank"
              rel="noreferrer"
              className="relative mt-3 inline-block font-display text-2xl font-bold text-white transition hover:text-cyanGlow"
            >
              {profile.college.shortName}
            </a>
            <p className="relative mt-2 text-sm leading-7 text-slate-400">{profile.college.details}</p>
          </motion.div>
        </motion.div>

        {/* Right 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,220,255,.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,.18),transparent_36%),#050816] shadow-card backdrop-blur md:h-[540px] group"
        >
          {/* Glowing border effect on hover */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />

          <Suspense fallback={<div className="grid h-full place-items-center text-sm text-slate-500">Loading 3D scene...</div>}>
            <DeveloperScene />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-cyanGlow md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
