import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useLenis } from '../hooks/useLenis.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function ScrollProgress() {
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 120, damping: 28, mass: 0.35 });
  const scaleX = useTransform(spring, (v) => Math.min(1, Math.max(0, v)));

  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  useEffect(() => {
    if (!lenis || reduced) return;

    const onScroll = (instance) => {
      setProgress(typeof instance.progress === 'number' ? instance.progress : 0);
    };

    lenis.on('scroll', onScroll);
    onScroll(lenis);

    return () => {
      lenis.off?.('scroll', onScroll);
    };
  }, [lenis, reduced]);

  useEffect(() => {
    if (lenis || reduced) return;

    const onNative = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };

    window.addEventListener('scroll', onNative, { passive: true });
    onNative();
    return () => window.removeEventListener('scroll', onNative);
  }, [lenis, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] bg-white/[0.04]">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-cyanGlow via-cyan-300 to-violetGlow shadow-[0_0_18px_rgba(79,220,255,0.45)]"
        style={{ scaleX, width: '100%' }}
      />
    </div>
  );
}
