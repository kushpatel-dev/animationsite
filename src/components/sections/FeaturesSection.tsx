"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🔢",
    title: "Token Counter",
    desc: "Real-time token estimate shown in popup. See '4.2K tokens' before you send — never get cut off mid-thought again.",
  },
  {
    icon: "⭐",
    title: "Prompt Scorer",
    desc: "AI scores your prompt quality before you send. Get better answers by knowing what makes a strong prompt.",
  },
  {
    icon: "🚀",
    title: "Chat Transfer",
    desc: "Export any conversation as a structured .md file. Open it on ChatGPT, Gemini, Claude, Perplexity and 5 more platforms instantly.",
  },
  {
    icon: "📚",
    title: "History",
    desc: "Full conversation history saved locally. Browse, search, and reopen any past session — never lose context again.",
  },
  {
    icon: "🔒",
    title: "100% Private",
    desc: "Everything runs entirely in your browser. Zero data sent to any server. No account required. No tracking. Ever.",
  },
];

export default function FeaturesSection() {
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
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play reverse play reverse" },
        }
      );

      // Spotlight follow on hover
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(300px at ${x}px ${y}px, rgba(124,58,237,0.1), rgba(17,17,24,0.7))`;
      };
      const onLeave = () => { card.style.background = ""; };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <section id="features" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="badge">Core Features</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem,4vw,3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Everything an AI power-user needs
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: 540,
            marginBottom: 60,
          }}
        >
          Five tools. One extension. Zero cloud.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass"
              style={{
                padding: 28,
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: "var(--text)",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
