import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { projects } from '../data/portfolio.js';

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Projects" title="Realistic student projects with product polish.">
          These placeholders are written like internship portfolio entries: clear problem, stack, and outcome.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-6 shadow-card backdrop-blur-xl"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-cyanGlow/20 to-violetGlow/20 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="relative mb-6 h-40 rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(79,220,255,.35),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))]">
                <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl border border-white/10 bg-ink/45 backdrop-blur" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 min-h-24 text-sm leading-7 text-slate-400">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cyanGlow/10 px-3 py-1 text-xs text-cyanGlow">{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyanGlow/40 hover:text-cyanGlow">
                  <Code2 size={16} /> GitHub
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-cyanGlow">
                  <ExternalLink size={16} /> Live
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
