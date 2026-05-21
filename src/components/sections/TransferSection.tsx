"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLATFORMS = [
  "ChatGPT","Gemini","Claude","Perplexity","Mistral","DeepSeek","AI Studio","Copilot","Arena.ai",
];

function Arrow() {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        height: 52,
      }}
    >
      {/* Static line */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, var(--purple), var(--cyan))",
          borderRadius: 2,
        }}
      />
      {/* Animated dot */}
      <div
        style={{
          position: "absolute",
          width: 24,
          height: 2,
          background: "linear-gradient(90deg, var(--purple), var(--cyan))",
          borderRadius: 2,
          animation: "flow-right 1.5s ease-in-out infinite",
        }}
      />
      {/* Arrowhead */}
      <div
        style={{
          position: "absolute",
          right: 4,
          width: 0, height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: "7px solid var(--cyan)",
        }}
      />
    </div>
  );
}

export default function TransferSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.querySelectorAll<HTMLElement>(".t-reveal").forEach((el, i) => {
      if (el.tagName === "H2") return; // handled by global ScrollAnimations (word-split)
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play reverse play reverse" },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transfer"
      style={{ background: "var(--surface)", padding: "100px 0", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge t-reveal">Chat Transfer</div>
        <h2
          className="t-reveal"
          style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Move your entire AI conversation in one click
        </h2>
        <p
          className="t-reveal"
          style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: 540, marginBottom: 60 }}
        >
          From any platform to any platform. Context intact.
        </p>

        {/* Flow diagram */}
        <div
          className="t-reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            gap: 0,
            overflowX: "auto",
            padding: "20px 0",
          }}
        >
          {[
            { label: "ChatGPT", sub: "Source", style: {} },
            null,
            { label: "TokenPilot", sub: "Export", style: { background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.5)", color: "var(--purple-light)" } },
            null,
            { label: "chat.md\netm: 4.2K tokens", sub: ".md file", style: { background: "rgba(34,211,238,0.08)", borderColor: "rgba(34,211,238,0.3)", color: "var(--cyan)", fontFamily: "monospace", fontSize: 11 } },
            null,
            { label: "Open on →", sub: "Destination", style: { background: "rgba(124,58,237,0.12)", borderColor: "rgba(124,58,237,0.5)", color: "var(--purple-light)" } },
          ].map((node, i) =>
            node === null ? (
              <Arrow key={i} />
            ) : (
              <div key={i} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "14px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                    minWidth: 90,
                    whiteSpace: "pre-line",
                    lineHeight: 1.5,
                    ...node.style,
                  }}
                >
                  {node.label}
                </div>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{node.sub}</span>
              </div>
            )
          )}
        </div>

        {/* Platforms grid */}
        <div
          className="t-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: 10,
            marginTop: 40,
          }}
        >
          {PLATFORMS.map((p) => (
            <div
              key={p}
              style={{
                background: "var(--surface2)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                color: "var(--text-muted)",
                transition: "all 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(124,58,237,0.4)";
                el.style.color = "var(--purple-light)";
                el.style.background = "rgba(124,58,237,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.color = "var(--text-muted)";
                el.style.background = "var(--surface2)";
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Popup mockup */}
        <div
          className="t-reveal"
          style={{
            width: 280,
            margin: "48px auto 0",
            background: "var(--surface2)",
            border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: 14,
            padding: 16,
            fontSize: 13,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 14,
                background: "linear-gradient(135deg, var(--purple-light), var(--cyan))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🛩 TokenPilot
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>v3.4</span>
          </div>
          {[
            ["Session tokens", "4,218"],
            ["Prompt score", "87 / 100", "var(--green)"],
            ["Messages", "28"],
            ["Platform", "ChatGPT"],
          ].map(([label, val, color]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 12,
              }}
            >
              <span style={{ color: "var(--text-dim)" }}>{label}</span>
              <span style={{ color: color || "var(--text-muted)", fontWeight: 600 }}>{val}</span>
            </div>
          ))}
          <div
            style={{
              width: "100%",
              marginTop: 14,
              padding: 10,
              background: "linear-gradient(135deg, var(--purple), #6d28d9)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            ⬆ Export as .md — Transfer Chat
          </div>
        </div>
      </div>
    </section>
  );
}
