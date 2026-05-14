import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function LoadingScreen() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      const t = window.setTimeout(() => setVisible(false), 900);
      return () => window.clearTimeout(t);
    }
    let start = null;
    const duration = 1180;
    let frame;
    const tick = (now) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const done = window.setTimeout(() => setVisible(false), duration + 120);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="relative flex w-[min(92vw,420px)] flex-col items-center gap-6 px-6">
            <div className="relative h-16 w-16">
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyanGlow/35 bg-cyanGlow/10"
                animate={reduced ? {} : { rotate: [0, 2, -2, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-1 rounded-2xl bg-gradient-to-br from-cyanGlow/80 to-violetGlow/70"
                animate={reduced ? {} : { scale: [1, 0.88, 1], opacity: [0.95, 0.75, 0.95] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.42em] text-slate-500">
                <span>Boot sequence</span>
                <span className="text-cyanGlow/90">{Math.round(progress * 100)}%</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyanGlow via-cyan-300 to-violetGlow"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.max(8, progress * 100)}%` }}
                  transition={{ duration: reduced ? 0 : 0.12, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
