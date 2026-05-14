import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function SectionHeading({ eyebrow, title, children }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.38em] text-cyanGlow">{eyebrow}</p>
      <h2 className="font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold tracking-tight text-white">{title}</h2>
      {children && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{children}</p>}
    </motion.div>
  );
}
