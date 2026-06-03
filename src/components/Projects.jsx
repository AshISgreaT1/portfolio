import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, GitBranch, Sparkles } from 'lucide-react';
import { projectFilters, projects } from '../data/portfolio.js';
import useTilt from '../hooks/useTilt.js';
import { useGsapReveal } from '../hooks/useGsapReveal.js';
import ImageTrail from './ImageTrail.jsx';

const trailImageSets = {
  'portfolio-premium': [
    'https://picsum.photos/seed/portfolio-ui/420/320',
    'https://picsum.photos/seed/portfolio-motion/420/320',
    'https://picsum.photos/seed/portfolio-code/420/320',
    'https://picsum.photos/seed/portfolio-grid/420/320'
  ],
  'ai-lab-interactive': [
    '/images/taskforge-login.png',
    '/images/taskforge-dashboard.png',
    '/images/taskforge-team.png',
    '/images/taskforge-projects.png'
  ],
  'secure-ops-dashboard': [
    '/images/ai-workspace-orchestrator-screenshot-1.png',
    '/images/ai-workspace-orchestrator-screenshot-2.png',
    '/images/ai-workspace-orchestrator-screenshot-3.png',
    '/images/ai-workspace-orchestrator-screenshot-4.png'
  ],
  'embedded-system-visualizer': [
    'https://picsum.photos/seed/electronics-ui/420/320',
    'https://picsum.photos/seed/signal-flow/420/320',
    'https://picsum.photos/seed/hardware-map/420/320',
    'https://picsum.photos/seed/telemetry-view/420/320'
  ]
};

function ProjectPreview({ project, index }) {
  const trailImages = trailImageSets[project.id] ?? trailImageSets['portfolio-premium'];
  const previewImages = trailImages.slice(0, 3);

  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${project.visual}`}>
      <div className="scanline-surface absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_75%_75%,rgba(0,212,255,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[72%] w-[78%]">
          {previewImages.map((image, imageIndex) => (
            <div
              key={image}
              className="absolute aspect-[1.15] w-[48%] overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-black/30"
              style={{
                left: `${imageIndex * 24}%`,
                top: `${imageIndex % 2 ? 24 : 6}%`,
                transform: `rotate(${(imageIndex - 1) * 7}deg)`
              }}
            >
              <img src={image} alt="" className="h-full w-full object-cover opacity-80 mix-blend-screen" />
            </div>
          ))}
        </div>
      </div>
      <ImageTrail items={trailImages} variant={(index % 4) + 1} />
      <div className="pointer-events-none absolute left-5 top-5 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-pinkGlow" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyanGlow" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
      </div>
      <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
        {project.category}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const { ref, transform } = useTilt(6);

  return (
    <motion.article
      ref={ref}
      data-reveal
      className="luxury-panel group rounded-3xl p-4 md:p-5"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.65 }}
    >
      <ProjectPreview project={project} index={index} />
      <div className="p-2 pt-6 md:p-3 md:pt-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyanGlow">{project.category}</p>
          <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyanGlow" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
        <p className="mt-4 min-h-28 text-sm leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="ripple-button relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyanGlow/50 hover:bg-cyanGlow/10"
          >
            <GitBranch size={16} />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="ripple-button relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow px-5 py-3 text-sm font-semibold text-white"
            >
              <ExternalLink size={16} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const scope = useGsapReveal();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section ref={scope} id="projects" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-12 h-[420px] w-[420px] rounded-full bg-pinkGlow/8 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[480px] w-[480px] rounded-full bg-cyanGlow/7 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div data-reveal className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanGlow">
              <Sparkles className="h-3.5 w-3.5" />
              Projects
            </div>
            <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
              Selected work with
              <br />
              <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
                cinematic polish.
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`ripple-button relative overflow-hidden rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'border-cyanGlow bg-cyanGlow/12 text-white shadow-[0_0_28px_rgba(0,212,255,0.16)]'
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
