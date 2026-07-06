"use client";

import { useState } from "react";
import { STORES, type Product, type StoreId } from "@/lib/products";
import { useCart } from "./CartProvider";
import Reveal from "./Reveal";

function ProductCard({
  item,
  store,
  index,
}: {
  item: Product;
  store: StoreId;
  index: number;
}) {
  const { add } = useCart();
  return (
    <div className="prod">
      <div
        className="ph"
        style={item.img ? { backgroundImage: `url('${item.img}')` } : undefined}
      >
        {item.b && <div className="badge">{item.b}</div>}
        {!item.img && <div className="fallback">{item.n}</div>}
      </div>
      <div className="prod-body">
        <h4>{item.n}</h4>
        <div className="desc">{item.d}</div>
        <div className="foot">
          <span className="p">${item.p.toFixed(2)}</span>
          <button
            className="add"
            aria-label={`Add ${item.n} to bag`}
            onClick={() =>
              add({ key: `${store}-${index}`, n: item.n, p: item.p, img: item.img })
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [store, setStore] = useState<StoreId>("inf");
  const active = STORES.find((s) => s.id === store) ?? STORES[0];

  return (
    <section className="shop pad" id="shop">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            The Shop
            <span className="gold-line" />
          </div>
          <h2>Take the Ritual Home</h2>
          <p>Everything we use on your crown, available to keep it thriving between visits.</p>
        </Reveal>

        <div className="shop-switch" role="tablist" aria-label="Store">
          {STORES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={store === s.id}
              className={`tab${store === s.id ? " active" : ""}`}
              onClick={() => setStore(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {store === "dope" && (
          <Reveal className="dope-hdr">
            <div className="logo">DOPE HAIR</div>
            <p style={{ color: "#8a7e84", fontWeight: 300, marginTop: 6 }}>
              Detangling brushes · picks · accessories — culture, elevated.
            </p>
          </Reveal>
        )}

        <div className={`prod-grid${store === "dope" ? " dope" : ""}`}>
          {active.items.map((item, i) => (
            <ProductCard key={`${store}-${i}`} item={item} store={store} index={i} />
          ))}
        </div>

        <Reveal className="wraps-teaser">
          <span className="soon">Coming Soon</span>
          <h3 style={{ marginTop: 16 }}>Sabrina&apos;s Custom Hair Wraps</h3>
          <p>
            Premium, hand-selected satin &amp; silk wraps designed to protect your crown in
            luxury. Join the list to be first.
          </p>
          <a
            href="#book"
            className="btn btn-ghost"
            style={{ borderColor: "rgba(255,255,255,.4)" }}
          >
            Join the Waitlist
          </a>
        </Reveal>
      </div>
    </section>
  );
}
