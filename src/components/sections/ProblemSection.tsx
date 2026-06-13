"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: "🚫",
    problem: '"You hit the token limit on ChatGPT mid-project"',
    solution:
      "TokenPilot shows real-time token count so you know before you hit the limit.",
  },
  {
    icon: "📋",
    problem: '"Copy-pasting breaks formatting and loses context"',
    solution:
      "Export as structured .md file — formatting and context fully preserved.",
  },
  {
    icon: "🔄",
    problem: '"Every AI platform is a fresh start — your history vanishes"',
    solution:
      "Full local conversation history. Your sessions are always there.",
  },
];

export default function ProblemSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play reverse play reverse" },
        }
      );
    });
  }, []);

  return (
    <section
      id="problem"
      style={{ background: "var(--surface)", padding: "100px 0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge">The Problem</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
         Switching AI tools often breaks context.
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: 540,
            marginBottom: 60,
          }}
        >
          Every platform resets you. TokenPilot breaks the wall.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                padding: 28,
                borderRadius: 16,
                background: "var(--surface2)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                {p.problem}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--green)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                ✓ {p.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
