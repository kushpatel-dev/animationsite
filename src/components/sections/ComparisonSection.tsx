"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { name: "🛩 TokenPilot", isTP: true, cols: ["✅","✅","✅","✅","✅"] },
  { name: "TokenScope",          isTP: false, cols: ["✅","✗","~","✗","~"] },
  { name: "AI Token Counter",    isTP: false, cols: ["✅","✗","✗","✗","~"] },
  { name: "Capsule Hub",         isTP: false, cols: ["~","✗","✅","~","✗"] },
];

const COLS = ["Token Counting","Prompt Scoring","Chat History","Cross-AI Transfer","100% Local / Private"];

export default function ComparisonSection() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play reverse play reverse" } }
    );
  }, []);

  const color = (v: string) =>
    v === "✅" ? "var(--green)" : v === "✗" ? "var(--red)" : "#f59e0b";

  return (
    <section
      id="comparison"
      style={{ background: "var(--surface)", padding: "100px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge">Compare</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 48,
          }}
        >
          The only extension that does all of this — locally
        </h2>

        <div ref={tableRef} style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "var(--surface2)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  Extension
                </th>
                {COLS.map((c) => (
                  <th
                    key={c}
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      background: "var(--surface2)",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.name}
                  style={{
                    background: row.isTP ? "rgba(124,58,237,0.06)" : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontWeight: row.isTP ? 700 : 400,
                      color: row.isTP ? "var(--purple-light)" : "var(--text)",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {row.name}
                  </td>
                  {row.cols.map((v, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        fontSize: v === "✅" ? 16 : 14,
                        color: color(v),
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        opacity: v === "✗" ? 0.7 : 1,
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 9999,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--green)",
          }}
        >
          🔒 No account. No server. No tracking.
        </div>
      </div>
    </section>
  );
}
