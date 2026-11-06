'use client';

import { useEffect, useState } from 'react';

type Chunk = { id: string; label: string };

/**
 * Homepage scroll choreography:
 *  - turns on chunked scroll-snapping (CSS in globals.css, desktop only)
 *  - reveals [data-reveal] elements with a staggered rise / blur-in
 *  - shows a side rail marking the current chunk
 * Everything is skipped for visitors who prefer reduced motion.
 */
export default function ScrollEffects() {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-snap]'));
    setChunks(sections.map((s) => ({ id: s.id, label: s.dataset.label ?? s.id })));

    if (reduce) return;
    root.classList.add('snap-page');

    // Reveal-on-scroll. Elements already in view stay visible; the rest start hidden.
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.hidden = 'false';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((el) => {
      el.style.setProperty('--i', el.dataset.reveal || '0');
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.dataset.hidden = 'true';
        io.observe(el);
      }
    });

    // Track the chunk crossing the middle of the viewport.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(sections.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((s) => spy.observe(s));

    return () => {
      root.classList.remove('snap-page');
      io.disconnect();
      spy.disconnect();
    };
  }, []);

  if (chunks.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
    >
      {chunks.map((c, i) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          aria-label={c.label}
          aria-current={i === active ? 'true' : undefined}
          className="group flex items-center gap-3"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            {c.label}
          </span>
          <span
            className={`block transition-all duration-300 ${
              i === active
                ? 'w-3 h-3 bg-gradient-to-br from-primary to-cyan shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]'
                : 'w-2 h-2 border border-primary/40 bg-card group-hover:border-primary'
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
