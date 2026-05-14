import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { ExternalLink, Code2 } from 'lucide-react';
import { projects } from '../data/portfolio.js';
import GlassmorphicCard from './GlassmorphicCard.jsx';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Projects" title="Work built with precision and care.">
          Real projects with clean code, thoughtful design, and tangible impact.
        </SectionHeading>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <GlassmorphicCard className="h-full flex flex-col">
                <div className="flex-1 p-6">
                  {/* Project image placeholder with gradient */}
                  <div className="mb-6 h-40 rounded-xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent border border-white/10 relative overflow-hidden group/img">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['0%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300 min-h-20">
                    {project.description}
                  </p>

                  {/* Tech stack badges with animation */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <motion.span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 + 0.3 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links with hover animation */}
                <div className="flex gap-3 p-6 pt-0">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code2 size={16} /> GitHub
                  </motion.a>

                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(79, 220, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} /> Live
                  </motion.a>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
