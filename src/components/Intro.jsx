import { motion } from 'framer-motion';
import { Bot, Cpu, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { intro } from '../data/portfolio.js';

const focusAreas = [
  { label: 'Web Development', icon: Sparkles, desc: 'React, Tailwind, JS' },
  { label: 'Cybersecurity', icon: ShieldCheck, desc: 'Kali Linux, Networks' },
  { label: 'AI Tools', icon: Bot, desc: 'Prompt Engineering' },
  { label: 'Electronics Core', icon: Cpu, desc: 'Telecom, Circuits' }
];

export default function Intro() {
  return (
    <section id="intro" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      {/* Background Accents */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-pinkGlow/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-14"
        >
          {/* Ambient Glows */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyanGlow/10 blur-[100px]" />
          <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-violetGlow/10 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-cyanGlow">Behind the Code</p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {intro.title}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{intro.lead}</p>
              </motion.div>

              {/* Focus Areas */}
              <motion.div
                className="mt-10 grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {focusAreas.map(({ label, icon: Icon, desc }) => (
                  <motion.div
                    key={label}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyanGlow/40 hover:bg-white/[0.06]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 [background:linear-gradient(135deg,rgba(0,212,255,0.08),transparent)]" />
                    <div className="relative">
                      <Icon className="mb-3 h-6 w-6 text-cyanGlow transition-transform duration-300 group-hover:scale-110" />
                      <p className="font-display text-sm font-semibold text-white">{label}</p>
                      <p className="mt-1 text-xs text-slate-500">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Code Editor */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="group relative rounded-[1.5rem] border border-white/[0.1] bg-[#0a0e17]/80 p-5 backdrop-blur sm:p-7"
            >
              {/* Terminal Header */}
              <div className="mb-6 flex items-center gap-2">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
                  <Terminal size={12} className="text-slate-500" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">real-talk.md</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-8">
                {intro.body.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="rounded-2xl border border-cyanGlow/20 bg-gradient-to-r from-cyanGlow/10 to-violetGlow/10 p-5"
                >
                  <p className="font-medium text-cyanGlow">
                    <span className="mr-2">{'//'}</span>
                    {intro.closing}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
