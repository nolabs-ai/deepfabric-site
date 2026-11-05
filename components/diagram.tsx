/** Shared building blocks for the matrix-style explainer diagrams. */
import type { ReactNode } from 'react';

export const MONO = 'var(--font-plex-mono), monospace';

export function DiagramDefs() {
  return (
    <defs>
      <linearGradient id="dg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
        <stop offset="0" stopColor="#4f46e5" />
        <stop offset="0.55" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
      <pattern id="dg-dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="9" y="9" width="2" height="2" fill="#4f46e5" fillOpacity="0.18" />
      </pattern>
    </defs>
  );
}

const hash = (i: number, j: number, s: number) => (((i * 37 + j * 91 + s * 53) * 2654435761) % 1000) / 1000;

/** cols x rows grid of squares centred on (x, y). */
export function Bitmap({
  x, y, cols, rows, cell = 5, gap = 2, seed = 1,
}: { x: number; y: number; cols: number; rows: number; cell?: number; gap?: number; seed?: number }) {
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  const out: ReactNode[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const v = hash(i, j, seed);
      const on = v > 0.32 || (i + j) % 4 === 0;
      out.push(
        <rect
          key={`${i}-${j}`}
          x={x - w / 2 + i * (cell + gap)}
          y={y - h / 2 + j * (cell + gap)}
          width={cell}
          height={cell}
          fill={on ? 'url(#dg-grad)' : 'none'}
          fillOpacity={on ? 0.4 + v * 0.6 : 0}
          stroke={on ? 'none' : 'url(#dg-grad)'}
          strokeOpacity="0.45"
        />,
      );
    }
  }
  return <g shapeRendering="crispEdges">{out}</g>;
}

export function Box({
  x, y, w, h, title, sub, icon, dashed = false, strong = false,
}: {
  x: number; y: number; w: number; h: number; title: string; sub?: string;
  icon?: { cols: number; rows: number; seed?: number }; dashed?: boolean; strong?: boolean;
}) {
  const tx = icon ? x + 46 : x + 14;
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h}
        fill="#fff"
        stroke="url(#dg-grad)"
        strokeWidth={strong ? 1.5 : 1}
        strokeOpacity={strong ? 0.9 : 0.6}
        strokeDasharray={dashed ? '4 4' : undefined}
        shapeRendering="crispEdges"
      />
      {icon && <Bitmap x={x + 24} y={y + h / 2} cols={icon.cols} rows={icon.rows} seed={icon.seed} />}
      <text x={tx} y={sub ? y + h / 2 - 2 : y + h / 2 + 4} fontFamily={MONO} fontSize="12.5" fontWeight="600" fill="#1e1b4b">
        {title}
      </text>
      {sub && (
        <text x={tx} y={y + h / 2 + 14} fontFamily={MONO} fontSize="10" fill="#1e1b4b" fillOpacity="0.55">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Right-angle arrow along path `d`, ending in a small square at `end`. */
export function Arrow({ d, end, delay = 0, label, lx, ly }: {
  d: string; end: [number, number]; delay?: number; label?: string; lx?: number; ly?: number;
}) {
  return (
    <g fill="none" shapeRendering="crispEdges">
      <path d={d} stroke="url(#dg-grad)" strokeOpacity="0.55" strokeWidth="1" />
      <path d={d} pathLength={100} stroke="url(#dg-grad)" strokeWidth="3" className="edge-signal" style={{ animationDelay: `${delay}s` }} />
      <rect x={end[0] - 3} y={end[1] - 3} width="6" height="6" fill="url(#dg-grad)" />
      {label && (
        <text x={lx} y={ly} fontFamily={MONO} fontSize="10" textAnchor="middle" fill="#4f46e5" fillOpacity="0.75" shapeRendering="auto">
          {label}
        </text>
      )}
    </g>
  );
}
