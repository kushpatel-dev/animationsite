"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHROME_STORE_URL } from "@/app/page";

const CHANGELOG = [
  {
    version: "3.5",
    label: "Latest",
    highlights: [
      "Send Chat to Another AI — pick target, auto-open new tab, auto-paste & submit.",
      "Falls back to clipboard when a target site blocks programmatic paste.",
      "Available from the toolbar popup and the on-page widget's Transfer tab.",
      "In-page toast confirms status (pasted, submitted, or manual-paste needed).",
    ],
  },
  {
    version: "3.4",
    highlights: ["Download chat as .md export.", "Prompt scorer & history."],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelectorAll(".cta-item"),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play reverse play reverse" },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{ padding: "120px 0", textAlign: "center" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge cta-item" style={{ justifyContent: "center" }}>
          🚀 Free Forever
        </div>

        <h2
          className="cta-item"
          style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          Ready to take control of{" "}
          <span className="gradient-text">your AI workflow?</span>
        </h2>

        <p
          className="cta-item"
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            marginBottom: 40,
          }}
        >
          Join AI power-users who never lose context again.
        </p>

        {/* Version badge */}
        <div
          className="cta-item"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 9999,
            padding: "6px 14px",
            fontSize: 12,
            color: "var(--text-dim)",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6, height: 6,
              background: "var(--green)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          v3.5 — Latest · Active Development
        </div>

        {/* Buttons */}
        <div
          className="cta-item"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-pulse"
            style={{
              fontSize: 15,
              padding: "16px 32px",
              background: "linear-gradient(135deg, var(--purple), #6d28d9)",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Install Free — Chrome
          </a>
          <a
            href="https://github.com/kushpatel-dev/TokenPilot"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{
              fontSize: 15,
              padding: "16px 32px",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "var(--purple-light)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Changelog */}
        <div
          className="cta-item"
          style={{
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "left",
            display: "grid",
            gap: 20,
          }}
        >
          {CHANGELOG.map((entry, i) => (
            <div
              key={entry.version}
              style={{
                padding: 20,
                borderRadius: 14,
                background: i === 0 ? "rgba(124,58,237,0.08)" : "var(--surface2)",
                border: `1px solid ${i === 0 ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: i === 0 ? "var(--purple-light)" : "var(--text)",
                  }}
                >
                  {i === 0 ? `What's new in v${entry.version}` : `v${entry.version}`}
                </span>
                {entry.label && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: "var(--purple)",
                      color: "#fff",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {entry.label}
                  </span>
                )}
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 8,
                }}
              >
                {entry.highlights.map((h, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      paddingLeft: 18,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        color: i === 0 ? "var(--purple-light)" : "var(--text-dim)",
                      }}
                    >
                      ›
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
