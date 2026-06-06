import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { aboutStats, profile, timeline } from '../data/portfolio.js';
import { useGsapReveal } from '../hooks/useGsapReveal.js';

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const [displayValue, setDisplayValue] = useState(0);

  // Handle both numeric and string values
  const isString = typeof value === 'string';

  useEffect(() => {
    if (inView && !isString) spring.set(value);
  }, [inView, spring, value, isString]);

  useEffect(() => {
    if (isString) return;
    return spring.on('change', (latest) => setDisplayValue(Math.round(latest)));
  }, [spring, isString]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-white md:text-5xl">
      {isString ? value : displayValue}
      {suffix}
    </span>
  );
}

export default function About() {
  const scope = useGsapReveal();

  return (
    <section ref={scope} id="about" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-[460px] w-[460px] rounded-full bg-violetGlow/8 blur-[140px]" />
        <div className="absolute right-0 bottom-1/4 h-[360px] w-[360px] rounded-full bg-cyanGlow/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div data-reveal className="mb-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanGlow">
              <Sparkles className="h-3.5 w-3.5" />
              About
            </div>
            <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
              Builder mindset,
              <br />
              <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
                product taste.
              </span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:ml-auto">
            I am {profile.name}, an Electronics and Telecommunication student who focuses on modern full stack craft:
            clean interfaces, backend integration, database workflows, useful motion, and practical engineering habits
            that make a product feel premium without making it hard to use.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              data-reveal
              className="luxury-panel rounded-2xl p-5 md:p-6"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">0{index + 1}</p>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.article data-reveal className="luxury-panel rounded-3xl p-7 md:p-9" whileHover={{ y: -4 }}>
            <div className="mb-6 flex items-center gap-3 text-slate-300">
              <MapPin className="h-5 w-5 text-cyanGlow" />
              <span className="text-sm font-semibold uppercase tracking-[0.25em]">Based in {profile.location}</span>
            </div>
            <h3 className="font-display text-3xl font-bold text-white">Internship-ready full stack developer.</h3>
            <div className="mt-6 space-y-5 leading-8 text-slate-300">
              <p>
                I am originally from {profile.hometown} and currently study at{' '}
                <a className="text-cyanGlow transition hover:text-white" href={profile.college.url} target="_blank" rel="noreferrer">
                  {profile.college.shortName}
                </a>
                . My strongest direction is full stack development, with a growing interest in AI-assisted workflows,
                cybersecurity basics, and system-level thinking.
              </p>
              <p>
                I care about details recruiters and users notice: fast loading, responsive spacing, accessible states,
                readable code, clean APIs, and interfaces that feel confidently designed.
              </p>
            </div>
            <a
              href={profile.resume}
              download
              className="ripple-button relative mt-8 inline-flex overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyanGlow/50 hover:bg-cyanGlow/10"
            >
              Download resume
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </motion.article>

          <div data-reveal className="luxury-panel rounded-3xl p-7 md:p-9">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-cyanGlow" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Trajectory</p>
            </div>
            <div className="relative space-y-7">
              <div className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyanGlow via-violetGlow to-transparent" />
              {timeline.map((item) => (
                <div key={item.title} className="relative grid gap-3 pl-10 sm:grid-cols-[7rem_1fr]">
                  <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border border-cyanGlow/40 bg-ink shadow-[0_0_24px_rgba(0,212,255,0.35)]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyanGlow">{item.label}</p>
                  <div>
                    <h4 className="font-display text-xl font-bold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
