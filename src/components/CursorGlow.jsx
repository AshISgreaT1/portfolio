import { useEffect } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function CursorGlow() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 32);
      cursorY.set(e.clientY - 32);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: 64,
        height: 64,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl" />
        <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
      </div>
    </motion.div>
  );
}
