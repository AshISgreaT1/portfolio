import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    const narrow = window.matchMedia('(max-width: 768px)').matches;
    const particleCount = narrow ? 14 : 26;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 2.5 + 0.8}px;
        height: ${Math.random() * 2.5 + 0.8}px;
        background: radial-gradient(circle, rgba(79, 220, 255, 0.75), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.45 + 0.15};
        box-shadow: 0 0 ${Math.random() * 8 + 4}px rgba(79, 220, 255, 0.45);
        will-change: transform, opacity;
      `;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        y: Math.random() * 160 - 80,
        x: Math.random() * 160 - 80,
        opacity: 0,
        duration: Math.random() * 3 + 2.2,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
      gsap.killTweensOf(particles);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 50%, rgba(79, 220, 255, 0.09) 0%, transparent 52%), radial-gradient(circle at 82% 78%, rgba(139, 92, 246, 0.1) 0%, transparent 48%)',
      }}
    />
  );
}
