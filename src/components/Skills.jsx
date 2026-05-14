import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { skills } from '../data/portfolio.js';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const skillCategories = {
    'Frontend': ['React', 'JavaScript', 'Tailwind CSS', 'VS Code'],
    'Backend & Data': ['MongoDB', 'Data Science', 'Prompt Engineering'],
    'Security & Systems': ['Kali Linux', 'Cybersecurity Basics', 'Computer Networks', 'Electronics'],
    'AI & ML': ['AI/ML Fundamentals', 'Prompt Engineering'],
    'Other': ['Telecommunication Systems'],
  };

  return (
    <section id="skills" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="Versatile toolkit across tech domains." >
          Full-stack capabilities spanning frontend, backend, cybersecurity, and AI.
        </SectionHeading>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skills.map((skill) => (
            <motion.div key={skill} variants={itemVariants}>
              <motion.button
                className="group relative px-5 py-3 text-sm font-medium rounded-full overflow-hidden"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

                {/* Border */}
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300" />

                {/* Animated shine effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%' }}
                />

                {/* Text content */}
                <span className="relative inline-block text-slate-200 group-hover:text-cyan-300 transition-colors duration-300">
                  {skill}
                </span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated grid background element */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skillCategories).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.5 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors pl-2 relative">
                    <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
