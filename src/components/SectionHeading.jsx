import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyanGlow">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-slate-400">{children}</p>}
    </motion.div>
  );
}
