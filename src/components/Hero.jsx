import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Download, Code2, Network, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import Aurora from "../components/Aurora";
import TiltedCard from './TiltedCard.jsx';

const HERO_CHARACTER_SRC = '/images/ayush-bitmoji-full-transparent.png';

const easeOut = [0.22, 1, 0.36, 1];

function MagneticButton({ children, className, strength = 0.2, ...props }) {
  const { offset, onMove, onLeave } = useMagnetic(strength);
  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.35 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function HeroContent() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef(null);

  useEffect(() => {
    if (reduced || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-animate',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: easeOut }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  const heroRoles = ['Full Stack Developer & Creative Engineer', 'React + Node.js Builder', 'Internship-ready Full Stack Developer'];
  const nameParts = profile.name.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10"
    >
      {/* Premium Badge */}
      <motion.div variants={itemVariants} className="hero-animate mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-5 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyanGlow opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyanGlow shadow-[0_0_12px_rgba(0,212,255,0.8)]"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyanGlow">
            Available for Full Stack Internship
          </span>
        </div>
      </motion.div>

      {/* Name with premium typography */}
      <motion.div variants={itemVariants} className="hero-animate">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-slate-400">
          {profile.location}
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-white">
          {nameParts.map((part, i) => (
            <span key={part} className="block">
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: easeOut }}
              >
                {part}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Role with typing effect */}
      <motion.div variants={itemVariants} className="hero-animate mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyanGlow" />
          <p className="font-display text-2xl font-semibold text-transparent bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text sm:text-3xl">
            <TypingRole words={heroRoles} />
          </p>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p variants={itemVariants} className="hero-animate mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
        {profile.tagline}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="hero-animate mt-10 flex flex-wrap gap-4">
        <MagneticButton strength={0.15}>
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow px-8 py-4 text-sm font-bold text-white overflow-hidden"
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">View Projects</span>
            <ArrowDown size={16} className="relative transition-transform duration-300 group-hover:translate-y-1" />
          </motion.a>
        </MagneticButton>

        <MagneticButton strength={0.12}>
          <motion.a
            href={profile.resume}
            download
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyanGlow/50 hover:bg-white/10"
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} />
            <span>Resume</span>
          </motion.a>
        </MagneticButton>

        <MagneticButton strength={0.1}>
          <motion.a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyanGlow/50 hover:bg-white/10 hover:text-cyanGlow"
            whileHover={reduced ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="GitHub"
          >
            <Code2 size={20} />
          </motion.a>
        </MagneticButton>

        <MagneticButton strength={0.1}>
          <motion.a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyanGlow/50 hover:bg-white/10 hover:text-cyanGlow"
            whileHover={reduced ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="LinkedIn"
          >
            <Network size={20} />
          </motion.a>
        </MagneticButton>
      </motion.div>

      {/* College Card */}
      <motion.div
        variants={itemVariants}
        className="hero-animate group relative mt-12 max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 backdrop-blur-md transition-all duration-500 hover:border-cyanGlow/30"
      >
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(ellipse_at_top_left,rgba(0,212,255,0.15),transparent_50%)]" />
        <div className="relative">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyanGlow">Currently Studying</p>
          <a
            href={profile.college.url}
            target="_blank"
            rel="noreferrer"
            className="font-display text-2xl font-bold text-white transition hover:text-cyanGlow"
          >
            {profile.college.shortName}
          </a>
          <p className="mt-2 text-sm leading-6 text-slate-400">{profile.college.details}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TypingRole({ words }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(word.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord, words]);

  return <span>{displayText}</span>;
}

function HeroPortrait() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <motion.div
      style={{ y, scale, rotate }}
      className="relative flex h-[500px] w-full items-center justify-center overflow-visible md:h-[620px] lg:h-[720px]"
    >
      <div className="relative h-full w-full max-w-[520px]">
        <TiltedCard
          imageSrc={HERO_CHARACTER_SRC}
          altText={`${profile.name} stylized portrait`}
          containerHeight={'100%'}
          containerWidth={'100%'}
          imageHeight={'100%'}
          imageWidth={'100%'}
          rotateAmplitude={10}
          scaleOnHover={1.04}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen snap-start overflow-hidden px-4 py-28 md:py-32 lg:py-40"
    >
      {/* Decorative background behind Aurora */}
      <div className="pointer-events-none absolute inset-0 z-[-1]">
        <div className="absolute left-1/4 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyanGlow/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-20 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-violetGlow/5 blur-[100px]" />
      </div>

      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute inset-0 z-[-1] opacity-[0.03]"
      >
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <Aurora
          colorStops={["#7cff67", "#B497CF", "#5227FF"]}
          blend={0.5}
          amplitude={1}
          speed={1}
        />
      </div>

      <div className="relative z-20 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <HeroContent />
        <HeroPortrait />
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition hover:text-cyanGlow md:flex"
        animate={reduced ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
