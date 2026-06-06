import { motion } from 'framer-motion';
import { Boxes, Code2, Database, Server, Sparkles, Terminal } from 'lucide-react';
import { skillCategories, skills } from '../data/portfolio.js';
import { useGsapReveal } from '../hooks/useGsapReveal.js';
import CurvedLoop from './CurvedLoop.jsx';

const iconMap = {
  Frontend: Code2,
  Backend: Server,
  Database,
  Tools: Terminal
};

const accentMap = {
  cyan: 'from-cyanGlow/25 to-cyanGlow/5 text-cyanGlow',
  violet: 'from-violetGlow/25 to-violetGlow/5 text-violetGlow',
  pink: 'from-pinkGlow/25 to-pinkGlow/5 text-pinkGlow',
  blue: 'from-blue-400/25 to-blue-400/5 text-blue-300'
};

function SkillCard({ category, index }) {
  const Icon = iconMap[category.category] ?? Boxes;

  return (
    <motion.article
      data-reveal
      className="luxury-panel group rounded-3xl p-6 md:p-7"
      whileHover={{ y: -8, rotateX: 1.2, rotateY: index % 2 ? -1.4 : 1.4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accentMap[category.accent]}`}>
        <Icon size={24} />
      </div>
      <h3 className="font-display text-2xl font-bold text-white">{category.category}</h3>
      <p className="mt-3 min-h-20 text-sm leading-7 text-slate-400">{category.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition group-hover:border-white/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const scope = useGsapReveal();

  return (
    <section ref={scope} id="skills" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanGlow/6 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div data-reveal className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanGlow">
              <Sparkles className="h-3.5 w-3.5" />
              Skills
            </div>
            <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
              Tools for modern
              <br />
              <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
                full stack systems.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-400">
            A focused toolkit for building immersive interfaces, integrating APIs, shaping data, and shipping polished work.
          </p>
        </div>

        <div data-reveal className="mb-10 relative overflow-visible">
          <div className="relative">
            <CurvedLoop
              marqueeText="React * JavaScript * Tailwind CSS * Framer Motion * Three.js * GSAP * Node.js * Express * MongoDB * REST APIs * GitHub * Vite * Full Stack Developer * Creative Engineer * Problem Solver *"
              speed={2}
              curveAmount={400}
              direction="left"
              interactive={true}
              className="text-white"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 skills-luxury-reset">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.category} category={category} index={index} />
          ))}
        </div>

        <div data-reveal className="mt-12 luxury-panel rounded-3xl p-5 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Technology matrix</p>
            <Boxes className="h-5 w-5 text-cyanGlow" />
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-slate-300"
                whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.45)', color: '#fff' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
