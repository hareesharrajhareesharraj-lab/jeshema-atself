import { useEffect } from 'react';

const PARTICLES = [
  { left: '8%', top: '78%', size: 3, duration: 46, delay: -4 },
  { left: '22%', top: '35%', size: 2, duration: 52, delay: -18 },
  { left: '41%', top: '88%', size: 3, duration: 58, delay: -30 },
  { left: '63%', top: '22%', size: 2, duration: 49, delay: -11 },
  { left: '78%', top: '64%', size: 3, duration: 55, delay: -25 },
  { left: '91%', top: '40%', size: 2, duration: 61, delay: -40 },
];

export default function AmbientMotion() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach((section) => {
      section.classList.add('reveal-section');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ambient-glow ambient-glow-blue" />
      <div className="ambient-glow ambient-glow-teal" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="ambient-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
