/** Original project mark: a blade crossing a moon ring. */
export function Emblem({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden fill="none">
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2" className="emblem-ring" pathLength={1} strokeDasharray="1" />
      <circle cx="50" cy="50" r="30" stroke="var(--blood)" strokeWidth="0.6" opacity="0.7" />
      <path d="M18 82 L82 18" stroke="currentColor" strokeWidth="2" className="emblem-blade" pathLength={1} strokeDasharray="1" />
      <path d="M26 74 l-6 -6 M30 70 l-8 -8" stroke="var(--blood)" strokeWidth="2" />
      <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
    </svg>
  );
}
