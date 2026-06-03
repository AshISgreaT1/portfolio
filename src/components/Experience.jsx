import { motion } from 'framer-motion';
import { BriefcaseBusiness, Sparkles } from 'lucide-react';
import { experiences } from '../data/portfolio.js';
import { useGsapReveal } from '../hooks/useGsapReveal.js';

export default function Experience() {
  const scope = useGsapReveal();

  return (
    <section ref={scope} id="experience" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violetGlow/7 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-reveal className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanGlow">
            <Sparkles className="h-3.5 w-3.5" />
            Experience
          </div>
          <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
            Practical work,
            <br />
            <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
              visible impact.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            A compact timeline of contribution, collaboration, and product-facing frontend work.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyanGlow via-violetGlow to-transparent md:block" />
          <div className="space-y-6">
            {experiences.map((item) => (
              <motion.article
                key={item.company}
                data-reveal
                className="luxury-panel rounded-3xl p-6 md:ml-14 md:p-8"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              >
                <div className="absolute -left-[3.95rem] top-8 hidden h-8 w-8 place-items-center rounded-full border border-cyanGlow/35 bg-ink text-cyanGlow shadow-[0_0_28px_rgba(0,212,255,0.24)] md:grid">
                  <BriefcaseBusiness size={15} />
                </div>
                <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyanGlow">{item.date}</p>
                    <h3 className="mt-4 font-display text-3xl font-bold text-white">{item.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{item.company}</p>
                    <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">
                      {item.type}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-7 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyanGlow shadow-[0_0_12px_rgba(0,212,255,0.7)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
