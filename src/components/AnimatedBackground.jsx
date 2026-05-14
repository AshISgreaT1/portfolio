import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create animated particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: radial-gradient(circle, rgba(79, 220, 255, 0.8), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(79, 220, 255, 0.5);
      `;
      container.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        y: Math.random() * 200 - 100,
        x: Math.random() * 200 - 100,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(79, 220, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
      }}
    />
  );
}
