import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function FloatingParticles({ count = 50 }) {
  const containerRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || count <= 0 || reduced) return;

    const particles = [];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 2.5 + 0.8;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, rgba(79, 220, 255, 0.95), rgba(79, 220, 255, 0.15));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${size * 2.2}px rgba(79, 220, 255, 0.45);
        pointer-events: none;
        will-change: transform, opacity;
      `;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        y: -Math.random() * 220 - 80,
        x: Math.random() * 40 - 20,
        opacity: 0,
        duration: Math.random() * 3.5 + 2.8,
        repeat: -1,
        delay: Math.random() * 2.2,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
      gsap.killTweensOf(particles);
    };
  }, [count, reduced]);

  if (reduced || count <= 0) return null;

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" />;
}
