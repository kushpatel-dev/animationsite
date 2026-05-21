"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BARS = [
  { label: "Short chats (5–15 messages)", pct: 95 },
  { label: "Medium chats (15–30 messages)", pct: 82 },
  { label: "Long chats (30+ messages)", pct: 72 },
];

export default function BenchmarksSection() {
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fillRefs.current.forEach((fill, i) => {
      if (!fill) return;
      ScrollTrigger.create({
        trigger: fill,
        start: "top 85%",
        onEnter: () => { fill.style.width = BARS[i].pct + "%"; },
        onLeaveBack: () => { fill.style.width = "0%"; },
      });
    });
  }, []);

  return (
    <section id="benchmarks" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge">Accuracy</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Battle-tested accuracy across chat lengths
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: 540,
            marginBottom: 60,
          }}
        >
          Token estimation tested on real ChatGPT → Gemini transfers.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 640,
          }}
        >
          {BARS.map((b, i) => (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600 }}>{b.label}</span>
                <span
                  style={{ fontSize: 15, fontWeight: 700, color: "var(--purple-light)" }}
                >
                  {b.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  ref={(el) => { fillRefs.current[i] = el; }}
                  className="benchmark-fill"
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: "14px 18px",
            background: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.2)",
            borderRadius: 10,
            fontSize: 13,
            color: "var(--cyan)",
            maxWidth: 640,
          }}
        >
          💡 Tested on live ChatGPT → Gemini transfer with a 30-message NovaBrew Shopify scenario
        </div>
      </div>
    </section>
  );
}
