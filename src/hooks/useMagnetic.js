import { useCallback, useState } from 'react';

/**
 * Subtle magnetic pull toward pointer while hovering the element.
 */
export function useMagnetic(strength = 0.22) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { offset, onMove, onLeave };
}
