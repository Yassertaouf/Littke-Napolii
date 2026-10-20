import { useEffect, useRef, type MouseEvent } from 'react';

/**
 * Statue de marbre qui mange la pizza :
 * apparition au scroll, flottement, halo rose, reflet lumineux
 * et légère inclinaison 3D qui suit la souris.
 */
export default function StatueArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="statue-art" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className="statue-glow" aria-hidden="true" />
      <div className="statue-tilt">
        <div className="statue-float">
          <img className="statue-img" src="/images/pizza-statue-eating.png" alt="Pizza, honey?" loading="lazy" />
          <span className="statue-shine" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
