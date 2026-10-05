/**
 * The icon set, drawn here rather than installed.
 *
 * Two reasons. First, the house rule is no emoji in a client deliverable, ever
 * — so icons have to be good, and a stroke set tuned to the brand's 1.5px
 * hairline reads better than a generic pack. Second, lucide-react's 1.x line
 * dropped brand glyphs, which means the social marks end up inlined anyway; at
 * that point the dependency is buying very little.
 *
 * 24×24 box, 1.5 stroke, round caps and joins. `currentColor` throughout, so an
 * icon always inherits the contrast decision its parent already made.
 */

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "check"
  | "circle-check"
  | "clock"
  | "calendar"
  | "user"
  | "users"
  | "crown"
  | "package"
  | "camera"
  | "gift"
  | "alert"
  | "info"
  | "close"
  | "menu"
  | "instagram"
  | "phone"
  | "message"
  | "map-pin"
  | "plus"
  | "minus"
  | "bag"
  | "leaf"
  | "chevron-down"
  | "trending"
  | "wallet"
  | "dashboard"
  | "scissors"
  | "sparkle"
  | "book"
  | "lock"
  | "external";

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  "arrow-left": <path d="M20 12H5m0 0 6-6m-6 6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H8m9 0v9" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "circle-check": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20c.9-3.7 3.8-5.6 7.2-5.6s6.3 1.9 7.2 5.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9.2" cy="8.4" r="3.2" />
      <path d="M3 19.5c.8-3.2 3.3-4.9 6.2-4.9s5.4 1.7 6.2 4.9" />
      <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6M18 14.9c2.1.5 3.4 2 4 4.6" />
    </>
  ),
  crown: <path d="M3.5 17.5h17M4 16 3 7l5 3.5L12 4l4 6.5L21 7l-1 9z" />,
  package: (
    <>
      <path d="M3.5 7.8 12 3.5l8.5 4.3v8.4L12 20.5l-8.5-4.3z" />
      <path d="M3.5 7.8 12 12m0 0 8.5-4.2M12 12v8.5M7.7 5.6l8.6 4.3" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5h3l1.6-2.4h7.8L17.5 8.5h3v11h-17z" />
      <circle cx="12" cy="13.6" r="3.4" />
    </>
  ),
  gift: (
    <>
      <path d="M3.5 9.5h17v3.2h-17zM4.8 12.7h14.4v7.8H4.8zM12 9.5v11" />
      <path d="M12 9.5S10.8 4 8.4 4a2.2 2.2 0 0 0 0 5.5zM12 9.5s1.2-5.5 3.6-5.5a2.2 2.2 0 0 1 0 5.5z" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2M12 16.2v.2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.4M12 7.6v.2" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3.5 7.5h17M3.5 12.5h17M3.5 17.5h17" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.2" />
    </>
  ),
  phone: (
    <path d="M6.6 3.8h3l1.5 3.7-2 1.4a11.5 11.5 0 0 0 5.9 5.9l1.4-2 3.7 1.5v3a1.6 1.6 0 0 1-1.7 1.7A15.8 15.8 0 0 1 4.9 5.5a1.6 1.6 0 0 1 1.7-1.7Z" />
  ),
  message: (
    <path d="M20.5 12.6c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.8-.4l-5 1.5 1.6-4A6.9 6.9 0 0 1 3.5 12.6c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
  ),
  "map-pin": (
    <>
      <path d="M19 10.4c0 5.1-7 10.6-7 10.6s-7-5.5-7-10.6a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  bag: (
    <>
      <path d="M4.6 7.5h14.8l-1.1 13H5.7z" />
      <path d="M8.8 10V6.8a3.2 3.2 0 0 1 6.4 0V10" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 9-5.2 13.4-10.4 13.4A5.6 5.6 0 0 1 4 11.8C4 6.6 9.4 4 20 4Z" />
      <path d="M14.6 9.4C10.8 11 7 14.4 5 20" />
    </>
  ),
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  trending: <path d="M3.5 17.5 10 11l3.6 3.6L20.5 7m0 0h-5m5 0v5" />,
  wallet: (
    <>
      <path d="M3.5 7.4A2 2 0 0 1 5.5 5.4h11.8v2.6M3.5 7.4v11.2h16v-4.3M3.5 7.4v3.9h16V9.3" />
      <path d="M16.5 13.2v.2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="8.4" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.6" />
      <rect x="13.5" y="11.6" width="7" height="8.9" rx="1.6" />
      <rect x="3.5" y="15" width="7" height="5.5" rx="1.6" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6.4" cy="6.4" r="2.6" />
      <circle cx="6.4" cy="17.6" r="2.6" />
      <path d="M8.4 8.2 20 19.4M8.4 15.8 20 4.6" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9zM18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  ),
  book: (
    <>
      <path d="M4 4.5h6a3 3 0 0 1 2 2.9v12a2.4 2.4 0 0 0-2-1.9H4z" />
      <path d="M20 4.5h-6a3 3 0 0 0-2 2.9v12a2.4 2.4 0 0 1 2-1.9h6z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
    </>
  ),
  external: <path d="M14 4.5h5.5V10M19 5l-8 8M18 13.5v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h5" />,
};

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

/** The BR seal, drawn. Used as the nav mark and the footer stamp. */
export function Seal({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <path
        d="M17 15h6.2c2.6 0 4.3 1.3 4.3 3.5s-1.4 3.4-3.4 3.6v.1c2.4.2 4 1.6 4 3.9 0 2.5-1.9 4-4.9 4H17z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M24 30.1c2.2 1.6 3.4 3.7 3.6 6.4M24 30.1c-1.9 1.8-2.9 3.9-3 6.4M24 30.1v7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
