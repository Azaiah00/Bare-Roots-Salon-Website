const ITEMS: [string, boolean][] = [
  ["Micro Locs", true],
  ["Sisterlocs", false],
  ["Holistic Hair Recovery", true],
  ["Traditional Locs", false],
  ["Silk Press", true],
  ["Color", false],
  ["Loc Artistry", true],
  ["Wellness", false],
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {[0, 1].map((dup) =>
          ITEMS.map(([label, strong], i) => (
            <span key={`${dup}-${i}`}>
              {strong ? <b>{label}</b> : label}
              <span style={{ margin: "0 12px" }}>·</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
