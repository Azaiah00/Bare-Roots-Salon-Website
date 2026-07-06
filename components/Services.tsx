"use client";

import { useState } from "react";
import { SERVICE_TABS } from "@/lib/content";
import Reveal from "./Reveal";

export default function Services() {
  const [active, setActive] = useState(SERVICE_TABS[0].id);
  const panel = SERVICE_TABS.find((t) => t.id === active) ?? SERVICE_TABS[0];

  return (
    <section className="services pad" id="services">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            The Menu
            <span className="gold-line" />
          </div>
          <h2>Signature Services</h2>
          <p>
            From your first coil to a lifetime of healthy hair — every service is a ritual,
            priced with transparency.
          </p>
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Service categories">
          {SERVICE_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`tab${active === t.id ? " active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="svc-grid" role="tabpanel">
          {panel.items.map((s, i) => (
            <Reveal as="div" key={`${panel.id}-${s.name}`} delay={Math.min(i * 0.06, 0.3)}>
              <a className="svc" href="#book" style={{ display: "block" }}>
                <h4>{s.name}</h4>
                <div className="price">{s.price}</div>
                <div className="dur">{s.dur}</div>
                <p>{s.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
