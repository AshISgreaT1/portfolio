import { motion } from 'framer-motion';
import { Bot, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { intro } from '../data/portfolio.js';

const focusAreas = [
  { label: 'Web Development', icon: Sparkles },
  { label: 'Cybersecurity', icon: ShieldCheck },
  { label: 'AI Tools', icon: Bot },
  { label: 'Electronics Core', icon: Cpu }
];

export default function Intro() {
  return (
    <section id="intro" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-panel p-6 shadow-card backdrop-blur-xl sm:p-10"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyanGlow/20 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-violetGlow/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyanGlow">Intro</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {intro.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{intro.lead}</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {focusAreas.map(({ label, icon: Icon }) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                    <Icon className="mb-4 text-cyanGlow" size={22} />
                    <p className="text-sm font-semibold text-white">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-ink/50 p-6 backdrop-blur">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs uppercase tracking-[0.25em] text-slate-500">real-talk.md</span>
              </div>

              <div className="space-y-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {intro.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="rounded-3xl border border-cyanGlow/20 bg-cyanGlow/10 p-5 font-medium text-cyanGlow">
                  {intro.closing}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
