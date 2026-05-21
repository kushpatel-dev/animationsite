"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Transfer", href: "#transfer" },
  { label: "Accuracy", href: "#benchmarks" },
  { label: "Compare", href: "#comparison" },
  { label: "GitHub", href: "https://github.com/kushpatel-dev/TokenPilot" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) {
        gsap.to(nav, { yPercent: -100, duration: 0.35, ease: "power2.inOut" });
      } else {
        gsap.to(nav, { yPercent: 0, duration: 0.35, ease: "power2.inOut" });
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            🛩 <span className="gradient-text">TokenPilot</span>
          </a>

          {/* Desktop links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 32 }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              style={{
                background: "var(--purple)",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Install Free
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text)",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              display: "none",
            }}
            className="mobile-only"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          {[...NAV_LINKS, { label: "Install Free", href: "#cta" }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--text)",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </>
  );
}
