import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { experiences } from '../data/portfolio.js';

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="Ready for internship teams." />
        <div className="space-y-5">
          {experiences.map((item) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/10 bg-panel p-6 shadow-card backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{item.role}</h3>
                  <p className="mt-1 text-cyanGlow">{item.company}</p>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-400">{item.date}</span>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-400">
                {item.points.map((point) => <li key={point}>- {point}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
