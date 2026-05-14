import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const TRAIL_LEN = 6;

export default function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [trail, setTrail] = useState([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(0, { stiffness: 500, damping: 35, mass: 0.2 });
  const ringY = useSpring(0, { stiffness: 500, damping: 35, mass: 0.2 });
  const trailTick = useRef(0);

  const finePointer = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(pointer: fine)').matches;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(mq.matches && finePointer && !reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [finePointer, reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add('premium-cursor');

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      trailTick.current += 1;
      if (trailTick.current % 2 !== 0) return;

      setTrail((prev) => [{ x: e.clientX, y: e.clientY }, ...prev].slice(0, TRAIL_LEN));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('premium-cursor');
    };
  }, [cursorX, cursorY, enabled, ringX, ringY, reduced]);

  if (!enabled) return null;

  return (
    <>
      {trail.map((point, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-[60] hidden md:block"
          style={{
            left: point.x,
            top: point.y,
            width: 5,
            height: 5,
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            opacity: 0.06 + i * 0.055,
            background: 'radial-gradient(circle, rgba(79,220,255,0.75), transparent)',
          }}
        />
      ))}

      <motion.div
        className="pointer-events-none fixed z-[61] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-cyanGlow shadow-[0_0_12px_rgba(79,220,255,0.9)]" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[60] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-9 w-9 rounded-full border border-cyanGlow/35 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 backdrop-blur-[2px]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/15 to-purple-400/15 blur-md" />
      </motion.div>
    </>
  );
}
