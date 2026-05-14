import { motion } from 'framer-motion';
import useTilt from '../hooks/useTilt.js';

export default function GlassmorphicCard({ children, className = '', enableTilt = true, tiltIntensity = 12 }) {
  const { ref, transform } = useTilt(enableTilt ? tiltIntensity : 0);

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden group ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
      }}
      whileHover={enableTilt ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-lg" />
      </div>

      {children}
    </motion.div>
  );
}
