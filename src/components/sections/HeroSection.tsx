"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Ball pit canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const COLORS = [
      { h: 270, s: 70, l: 65 },
      { h: 190, s: 80, l: 60 },
      { h: 255, s: 60, l: 75 },
      { h: 280, s: 65, l: 55 },
      { h: 200, s: 75, l: 65 },
    ];
    const GRAVITY      = 0.22;
    const DAMPING      = 0.72;
    const MOUSE_RADIUS = 140;
    const MOUSE_FORCE  = 9;
    const BALL_COUNT   = 55;
    const MAX_SPEED    = 18;

    type Ball = {
      x: number; y: number; r: number;
      vx: number; vy: number;
      color: { h: number; s: number; l: number };
      opacity: number;
    };

    let balls: Ball[] = [];
    let W = 0, H = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      W = canvas.width  = section.clientWidth;
      H = canvas.height = section.clientHeight;
    };

    const createBall = (): Ball => {
      const r = Math.random() * 10 + 8;
      return {
        x: Math.random() * (W - r * 2) + r,
        y: Math.random() * H * 0.65,
        r,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.3 + 0.55,
      };
    };

    const init = () => {
      resize();
      balls = [];
      for (let i = 0; i < BALL_COUNT; i++) balls.push(createBall());
    };

    const resolveCollision = (a: Ball, b: Ball) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = a.r + b.r;
      if (dist < minDist && dist > 0.01) {
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (minDist - dist) * 0.5;
        a.x -= nx * overlap; a.y -= ny * overlap;
        b.x += nx * overlap; b.y += ny * overlap;
        const dot = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (dot > 0) {
          a.vx -= dot * nx; a.vy -= dot * ny;
          b.vx += dot * nx; b.vy += dot * ny;
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", init);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (mouse.active) {
        balls.forEach((b) => {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
          }
        });
      }

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          resolveCollision(balls[i], balls[j]);
        }
      }

      balls.forEach((b) => {
        b.vy += GRAVITY;
        b.x  += b.vx;
        b.y  += b.vy;

        if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx) * DAMPING; }
        if (b.x + b.r > W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx) * DAMPING; }
        if (b.y - b.r < 0)  { b.y = b.r;     b.vy =  Math.abs(b.vy) * DAMPING; }
        if (b.y + b.r > H)  { b.y = H - b.r; b.vy = -Math.abs(b.vy) * DAMPING; }

        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }

        const { h, s, l } = b.color;
        const grad = ctx.createRadialGradient(
          b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.05,
          b.x, b.y, b.r
        );
        grad.addColorStop(0, `hsla(${h}, ${s}%, ${l + 20}%, ${b.opacity})`);
        grad.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, ${b.opacity * 0.55})`);

        ctx.save();
        ctx.shadowBlur  = 16;
        ctx.shadowColor = `hsla(${h}, ${s}%, ${l}%, 0.55)`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
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
      ref={sectionRef}
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
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", zIndex: 1 }}
      >
        <div
          ref={contentRef}
          style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}
        >
          <div
            className="badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "var(--purple-light)",
              borderRadius: 9999,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--green)",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            New in v3.5 · Send Chat to Another AI
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Send any AI chat to any other AI.{" "}
            <span className="gradient-text">One click.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-muted)",
              maxWidth: 620,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
           Jump between AI tools without losing context.
          </p>

          {/* CTA button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 56,
            }}
          >
            <a
              href="https://github.com/kushpatel-dev/TokenPilot"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ border: "1px solid rgba(124,58,237,0.4)", color: "var(--purple-light)", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <svg height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* v3.5 screenshot placeholder */}
          <div
            style={{
              maxWidth: "60%",
              margin: "0 auto",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.15)",
              background: "var(--surface2)",
            }}
          >
            <Image
              src="/screenshots/version3:5.jpeg"
              alt="TokenPilot v3.5 — Send Chat to Another AI"
              width={1520}
              height={900}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>


    </section>
  );
}
