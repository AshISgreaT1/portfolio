import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { skills } from '../data/portfolio.js';

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="A cross-domain toolkit for modern tech." />
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035 }}
              className="rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-sm text-slate-200 backdrop-blur hover:border-cyanGlow/40 hover:text-cyanGlow"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
