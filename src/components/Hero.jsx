import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Download, Code2, Network } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import TypingAnimation from './TypingAnimation.jsx';
import FloatingParticles from './FloatingParticles.jsx';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import { useMagnetic } from '../hooks/useMagnetic.js';

const DeveloperScene = lazy(() => import('./scene/DeveloperScene.jsx'));

const easeOut = [0.22, 1, 0.36, 1];

function MagneticSurface({ children, className, strength = 0.2 }) {
  const { offset, onMove, onLeave } = useMagnetic(strength);
  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const glowRef = useRef(null);
  const containerRef = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const [compact, setCompact] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const parallaxGlow = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const parallaxGrid = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -28]);
  const parallaxScene = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduced || !glowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        opacity: 0.92,
        scale: 1.06,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  const heroRoles = ['Frontend Developer', 'Full-Stack Explorer', 'Tech Enthusiast'];
  const nameParts = profile.name.split(' ');

  const onSpotMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const particleCount = reduced ? 0 : compact ? 14 : 30;

  const leftContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: reduced ? 0 : 0.06 },
    },
  };

  const leftItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={onSpotMove}
      className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:pt-36"
    >
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(520px circle at ${spot.x}px ${spot.y}px, rgba(79,220,255,0.14), transparent 55%)`,
          }}
        />
      )}

      <motion.div style={{ y: parallaxGrid }} className="pointer-events-none absolute inset-0 -z-[1] opacity-[0.35]">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:56px_56px]" />
      </motion.div>

      <motion.div style={{ y: parallaxGlow }} className="pointer-events-none absolute -left-24 top-20 h-[28rem] w-[28rem] rounded-full bg-[conic-gradient(from_120deg,rgba(79,220,255,0.22),transparent,rgba(139,92,246,0.2),transparent,rgba(79,220,255,0.18))] blur-3xl opacity-80" />

      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyanGlow/18 blur-3xl" />

      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/12 blur-3xl"
        animate={reduced ? {} : { y: [0, 36, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <FloatingParticles count={particleCount} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] blur-[1px]" />
          <div className="relative rounded-[1.85rem] border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl sm:p-8">
            <motion.div variants={leftItem}>
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyanGlow"
                animate={reduced ? {} : { boxShadow: ['0 0 0 rgba(79,220,255,0)', '0 0 28px rgba(79,220,255,0.18)', '0 0 0 rgba(79,220,255,0)'] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyanGlow shadow-[0_0_12px_rgba(79,220,255,0.9)]" />
                Internship portfolio · 2026
              </motion.div>
            </motion.div>

            <motion.div variants={leftItem} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">{profile.location}</p>
              <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.055em] text-white">
                {nameParts.map((part, i) => (
                  <motion.span
                    key={part}
                    className="inline-block pr-[0.18em]"
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.65, ease: easeOut }}
                  >
                    {part}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              variants={leftItem}
              className="mt-5 max-w-2xl text-lg font-semibold text-cyan-200 sm:text-2xl"
            >
              <TypingAnimation words={heroRoles} speed={78} delayBetweenWords={2600} />
            </motion.div>

            <motion.p variants={leftItem} className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={leftItem} className="mt-9 flex flex-wrap gap-3">
              <MagneticSurface strength={0.16}>
                <motion.a
                  href="#skills"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-bold text-white"
                  whileHover={reduced ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-600 opacity-100 transition duration-300 group-hover:opacity-95" />
                  <span className="relative">View skills</span>
                </motion.a>
              </MagneticSurface>

              <MagneticSurface strength={0.14}>
                <motion.a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-400/45 hover:bg-white/[0.12]"
                  whileHover={reduced ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} /> Résumé
                </motion.a>
              </MagneticSurface>

              <MagneticSurface strength={0.12}>
                <motion.a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-cyan-400/45 hover:text-cyan-200"
                  whileHover={reduced ? {} : { scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  title="GitHub"
                >
                  <Code2 size={18} />
                </motion.a>
              </MagneticSurface>

              <MagneticSurface strength={0.12}>
                <motion.a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-cyan-400/45 hover:text-cyan-200"
                  whileHover={reduced ? {} : { scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  title="LinkedIn"
                >
                  <Network size={18} />
                </motion.a>
              </MagneticSurface>
            </motion.div>

            <motion.div
              variants={leftItem}
              className="group relative mt-10 max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 backdrop-blur-md transition duration-500 hover:border-cyan-400/35 sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_20%_0%,rgba(79,220,255,0.12),transparent_55%)]" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.28em] text-cyanGlow">Currently studying</p>
              <a
                href={profile.college.url}
                target="_blank"
                rel="noreferrer"
                className="relative mt-3 inline-block font-display text-2xl font-bold text-white transition hover:text-cyanGlow sm:text-3xl"
              >
                {profile.college.shortName}
              </a>
              <p className="relative mt-2 text-sm leading-7 text-slate-400">{profile.college.details}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: reduced ? 0 : 0.15, ease: easeOut }}
          className="relative"
        >
          <motion.div
            style={{ y: parallaxScene }}
            className="relative h-[400px] overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_22%_18%,rgba(79,220,255,.18),transparent_34%),radial-gradient(circle_at_78%_72%,rgba(139,92,246,.2),transparent_38%),#050816] shadow-card backdrop-blur sm:h-[480px] md:h-[540px]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70 pointer-events-none" />
            <div className="absolute inset-px rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

            <Suspense fallback={<div className="grid h-full place-items-center text-sm text-slate-500">Loading scene…</div>}>
              <DeveloperScene />
            </Suspense>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-cyanGlow md:block"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
