import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(selector = '[data-reveal]', options = {}) {
  const scope = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = scope.current;
    if (!element || reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((target, index) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: 42, filter: 'blur(14px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            delay: index * 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: target,
              start: options.start ?? 'top 82%',
              once: true
            }
          }
        );
      });
    }, element);

    return () => ctx.revert();
  }, [options.start, reduced, selector]);

  return scope;
}
