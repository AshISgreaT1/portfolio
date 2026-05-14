import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingParticles({ count = 50 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, rgba(79, 220, 255, 1), rgba(79, 220, 255, 0.3));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${size * 2}px rgba(79, 220, 255, 0.6);
        pointer-events: none;
      `;
      container.appendChild(particle);

      gsap.to(particle, {
        y: -Math.random() * 300 - 100,
        opacity: 0,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        delay: Math.random() * 2,
        ease: 'power1.inOut'
      });
    }
  }, [count]);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}
