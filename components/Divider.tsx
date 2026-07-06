/**
 * Botanical gold line-art divider — a thin stem with a single bloom,
 * marking the break between sections. Gold as jewelry, never paint.
 */
export default function Divider({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`divider${onDark ? " on-dark" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 220 30" fill="none">
        <line x1="0" y1="15" x2="88" y2="15" stroke="url(#dg)" strokeWidth="1" />
        <line x1="132" y1="15" x2="220" y2="15" stroke="url(#dg2)" strokeWidth="1" />
        <g stroke="#C9A15A" strokeWidth="1.1" fill="none">
          <path d="M110 6c-5 5-5 12 0 16 5-4 5-11 0-16z" fill="#C9A15A" fillOpacity=".5" />
          <path d="M110 22c0-6 3-9 8-11M110 22c0-6-3-9-8-11" strokeLinecap="round" />
        </g>
        <circle cx="110" cy="4" r="1.6" fill="#E7CE9A" />
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C9A15A" stopOpacity="0" />
            <stop offset="1" stopColor="#C9A15A" />
          </linearGradient>
          <linearGradient id="dg2" x1="132" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C9A15A" />
            <stop offset="1" stopColor="#C9A15A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
