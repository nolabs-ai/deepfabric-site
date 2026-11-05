/**
 * Hero visual: a topic graph as a data matrix. Nodes are grids of small
 * squares, links are right-angle traces, and samples are tiny bitmaps.
 * Pure SVG; light packets travel the traces (disabled under
 * prefers-reduced-motion).
 */

type P = [number, number];

const W = 1000;
const ROOT: P = [500, 62];
const TOPICS: P[] = [
  [230, 172],
  [500, 172],
  [770, 172],
];
const SUBTOPICS: P[][] = [
  [[145, 282], [230, 282], [315, 282]],
  [[415, 282], [500, 282], [585, 282]],
  [[685, 282], [770, 282], [855, 282]],
];

const TIERS = [
  { y: 62, label: '01 DOMAIN' },
  { y: 172, label: '02 TOPICS' },
  { y: 282, label: '03 SUBTOPICS' },
  { y: 388, label: '04 SAMPLES' },
];

// Illustrative worked example
const DOMAIN_LABEL = 'Kubernetes';
const TOPIC_LABELS = ['Networking', 'Storage', 'Security'];
const SUB_LABELS = [
  ['Ingress', 'Services', 'DNS'],
  ['Volumes', 'Claims', 'CSI'],
  ['RBAC', 'Secrets', 'Policies'],
];

const LABEL_FONT = 'var(--font-plex-mono), monospace';

/** Right-angle trace: down, across, down. */
const trace = ([x1, y1]: P, [x2, y2]: P, at = 0.5) => {
  const m = y1 + (y2 - y1) * at;
  return x1 === x2 ? `M${x1} ${y1}V${y2}` : `M${x1} ${y1}V${m}H${x2}V${y2}`;
};

/** Deterministic 0..1 value per cell. */
const h = (i: number, j: number, s: number) => (((i * 37 + j * 91 + s * 53) * 2654435761) % 1000) / 1000;

/** A cols x rows grid of squares centred on (x, y). */
function Matrix({
  x, y, cols, rows, cell, gap, seed, solid = false,
}: {
  x: number; y: number; cols: number; rows: number; cell: number; gap: number; seed: number; solid?: boolean;
}) {
  const w = cols * cell + (cols - 1) * gap;
  const hh = rows * cell + (rows - 1) * gap;
  const cells = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const v = h(i, j, seed);
      const centre = i === (cols - 1) / 2 && j === (rows - 1) / 2;
      const on = solid || centre || v > 0.35;
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={x - w / 2 + i * (cell + gap)}
          y={y - hh / 2 + j * (cell + gap)}
          width={cell}
          height={cell}
          fill={on ? 'url(#tg-grad)' : 'none'}
          fillOpacity={solid || centre ? 1 : 0.35 + v * 0.65}
          stroke={on ? 'none' : 'url(#tg-grad)'}
          strokeOpacity="0.45"
          strokeWidth="1"
        />,
      );
    }
  }
  return <g shapeRendering="crispEdges">{cells}</g>;
}

export default function TopicGraph({ className = '' }: { className?: string }) {
  const edges: { d: string; delay: number; major: boolean }[] = [];
  let n = 0;
  TOPICS.forEach((t, i) => {
    edges.push({ d: trace(ROOT, t, 0.55), delay: (n++ * 0.5) % 5, major: true });
    SUBTOPICS[i].forEach((s) => edges.push({ d: trace(t, s, 0.5), delay: (n++ * 0.5) % 5, major: false }));
  });

  const samples = SUBTOPICS.flat().map(([x], i) => ({ x, y: 388, i }));
  const marks: P[] = [[940, 62], [940, 172], [940, 282], [940, 388]];

  return (
    <svg
      viewBox={`0 0 ${W} 440`}
      className={className}
      role="img"
      aria-label="A topic graph expanding from a domain into topics, subtopics and training samples, drawn as a matrix of squares"
    >
      <defs>
        <linearGradient id="tg-grad" gradientUnits="userSpaceOnUse" x1="100" y1="0" x2="900" y2="0">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <pattern id="tg-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="9" y="9" width="2" height="2" fill="#4f46e5" fillOpacity="0.22" />
        </pattern>
        <radialGradient id="tg-fade" cx="50%" cy="45%" r="60%">
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="tg-mask">
          <rect width={W} height="440" fill="url(#tg-fade)" />
        </mask>
      </defs>

      {/* Dot matrix backdrop */}
      <rect width={W} height="440" fill="url(#tg-dots)" mask="url(#tg-mask)" shapeRendering="crispEdges" />

      {/* Tier guides */}
      {TIERS.map((t) => (
        <g key={t.label}>
          <line x1="96" x2="904" y1={t.y} y2={t.y} stroke="#4f46e5" strokeOpacity="0.1" shapeRendering="crispEdges" />
          <text x="14" y={t.y + 3} fontSize="9.5" letterSpacing="2.2" fill="#4f46e5" fillOpacity="0.55" fontFamily="var(--font-plex-mono), monospace">
            {t.label}
          </text>
        </g>
      ))}
      {marks.map(([x, y]) => (
        <path key={y} d={`M${x - 4} ${y}H${x + 4}M${x} ${y - 4}V${y + 4}`} stroke="#4f46e5" strokeOpacity="0.35" shapeRendering="crispEdges" />
      ))}

      {/* Traces + travelling packets */}
      {edges.map((e, i) => (
        <g key={i} fill="none" shapeRendering="crispEdges">
          <path d={e.d} stroke="url(#tg-grad)" strokeOpacity={e.major ? 0.6 : 0.4} strokeWidth="1" />
          <path
            d={e.d}
            pathLength={100}
            stroke="url(#tg-grad)"
            strokeWidth="3"
            className="edge-signal"
            style={{ animationDelay: `${e.delay}s` }}
          />
        </g>
      ))}

      {/* Subtopic -> sample stems */}
      {samples.map(({ x, y }) => (
        <line key={x} x1={x} x2={x} y1={292} y2={y - 18} stroke="url(#tg-grad)" strokeOpacity="0.35" shapeRendering="crispEdges" />
      ))}

      {/* Samples: 5x3 bitmaps */}
      {samples.map(({ x, y, i }) => (
        <g key={x}>
          <rect x={x - 28} y={y - 18} width="56" height="36" fill="#fff" stroke="url(#tg-grad)" strokeOpacity="0.5" shapeRendering="crispEdges" />
          <Matrix x={x} y={y} cols={5} rows={3} cell={6} gap={3} seed={i + 1} />
        </g>
      ))}

      {/* Subtopics: framed squares */}
      {SUBTOPICS.flat().map(([x, y], i) => (
        <g key={`s${x}`} shapeRendering="crispEdges">
          <rect x={x - 13} y={y - 13} width="26" height="26" fill="#fff" stroke="url(#tg-grad)" strokeOpacity="0.6" />
          <Matrix x={x} y={y} cols={2} rows={2} cell={7} gap={2} seed={i + 20} />
        </g>
      ))}

      {/* Topics: 3x3 */}
      {TOPICS.map(([x, y], i) => (
        <g key={`t${x}`} shapeRendering="crispEdges">
          <rect x={x - 24} y={y - 24} width="48" height="48" fill="#fff" stroke="url(#tg-grad)" strokeOpacity="0.7" />
          <Matrix x={x} y={y} cols={3} rows={3} cell={10} gap={3} seed={i + 40} />
        </g>
      ))}

      {/* Domain: 4x4, solid core */}
      <g shapeRendering="crispEdges">
        <rect x={ROOT[0] - 34} y={ROOT[1] - 34} width="68" height="68" fill="#fff" stroke="url(#tg-grad)" strokeWidth="1.5" />
        <Matrix x={ROOT[0]} y={ROOT[1]} cols={4} rows={4} cell={11} gap={3} seed={60} />
      </g>

      {/* Example labels */}
      <g fontFamily={LABEL_FONT} fill="#1e1b4b">
        <text x={ROOT[0] + 46} y={ROOT[1] - 2} fontSize="15" fontWeight="600">{DOMAIN_LABEL}</text>
        <text x={ROOT[0] + 46} y={ROOT[1] + 15} fontSize="10" fillOpacity="0.55">domain</text>
        {TOPICS.map(([x, y], i) => (
          <g key={TOPIC_LABELS[i]}>
            <text x={x + 36} y={y - 1} fontSize="13" fontWeight="600">{TOPIC_LABELS[i]}</text>
            <text x={x + 36} y={y + 14} fontSize="10" fillOpacity="0.55">topic</text>
          </g>
        ))}
        {SUBTOPICS.map((row, i) =>
          row.map(([x, y], j) => (
            <text key={SUB_LABELS[i][j]} x={x} y={y + 34} fontSize="10.5" textAnchor="middle" fillOpacity="0.8">
              {SUB_LABELS[i][j]}
            </text>
          )),
        )}
      </g>
    </svg>
  );
}
