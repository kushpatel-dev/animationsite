"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const particles: {
      x: number; y: number; r: number;
      vx: number; vy: number; opacity: number; hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 270 : 190,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Token counter count-up ── */
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const target = 4218;
    const duration = 2200;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOut(p) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    gsap.from(content.children, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 64,
        marginTop:64,
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        data-hero-exit
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", zIndex: 1 }}
      >
        <div
          ref={contentRef}
          style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}
        >
          <div className="badge">🛩 Now in Development · Beta Available</div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Stop losing your AI conversations.{" "}
            <span className="gradient-text">Transfer them anywhere.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-muted)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            TokenPilot counts tokens, scores your prompts, and lets you export
            any AI chat to continue on another platform — in seconds.
          </p>

          {/* Token counter */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(17,17,24,0.8)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 12,
              padding: "12px 20px",
              fontSize: 14,
              color: "var(--text-muted)",
              marginBottom: 40,
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: "var(--green)",
                borderRadius: "50%",
                display: "inline-block",
                animation: "pulse-dot 1.5s ease-in-out infinite",
              }}
            />
            Live token estimate:
            <span
              ref={counterRef}
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--purple-light)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0
            </span>
            tokens
          </div>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/kushpatel-dev/TokenPilot"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-pulse"
              style={{ border: "1px solid rgba(124,58,237,0.4)", color: "var(--purple-light)", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <svg height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

        </div>
      </div>


    </section>
  );
}
