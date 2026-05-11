import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="relative flex flex-col items-center gap-5">
            <div className="h-16 w-16 rounded-2xl border border-cyanGlow/30 bg-cyanGlow/10 shadow-neon">
              <motion.div
                className="h-full w-full rounded-2xl bg-gradient-to-br from-cyanGlow/70 to-violetGlow/60"
                animate={{ rotate: 360, scale: [1, 0.82, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Initializing portfolio</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
