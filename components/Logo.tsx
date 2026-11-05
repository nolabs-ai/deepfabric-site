import { useId } from 'react';

/** DeepFabric mark: a tiny topic graph (one root fanning out to three nodes). */
export default function Logo({ size = 32 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="0.6" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id}-bg)`} />
      <g stroke="#fff" strokeOpacity="0.85" strokeWidth="1.6" strokeLinecap="round">
        <path d="M16 9.5C16 14 8.5 13 8.5 21.5" />
        <path d="M16 9.5V21.5" />
        <path d="M16 9.5C16 14 23.5 13 23.5 21.5" />
      </g>
      <circle cx="16" cy="9" r="3" fill="#fff" />
      <circle cx="8.5" cy="22" r="2.2" fill="#fff" fillOpacity="0.9" />
      <circle cx="16" cy="22" r="2.2" fill="#fff" fillOpacity="0.9" />
      <circle cx="23.5" cy="22" r="2.2" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}
