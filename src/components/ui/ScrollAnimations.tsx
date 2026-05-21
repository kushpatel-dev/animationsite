"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REPLAY = "play reverse play reverse" as const;

export default function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── Scroll progress bar ──────────────────────────────
      const bar = document.getElementById("gsap-scroll-bar");
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
          },
        });
      }

      // ─── Hero content exit (scrubbed) ─────────────────────
      const heroContent = document.querySelector("[data-hero-exit]") as HTMLElement | null;
      if (heroContent) {
        gsap.to(heroContent, {
          y: -60,
          opacity: 0,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: heroContent.closest("section") || heroContent,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ─── Section h2 word-by-word reveal ───────────────────
      document.querySelectorAll("section h2").forEach((h2El) => {
        const h2 = h2El as HTMLElement;

        // h2 has child elements (e.g. gradient span) — skip word split, simple reveal
        if (h2.children.length > 0) {
          gsap.fromTo(
            h2,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: h2, start: "top 82%", toggleActions: REPLAY },
            }
          );
          return;
        }

        const text = (h2.textContent || "").trim();
        const words = text.split(/\s+/);

        h2.innerHTML = words
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.05em"><span class="gsap-word" style="display:inline-block;will-change:transform">${w}</span></span>`
          )
          .join(" ");

        gsap.fromTo(
          h2.querySelectorAll(".gsap-word"),
          { y: "108%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.065,
            ease: "power3.out",
            scrollTrigger: {
              trigger: h2,
              start: "top 82%",
              toggleActions: REPLAY,
            },
          }
        );
      });

      // ─── Badge bounce-in ──────────────────────────────────
      document.querySelectorAll(".badge").forEach((badge) => {
        gsap.fromTo(
          badge,
          { scale: 0.55, opacity: 0, y: 10 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "back.out(2.8)",
            scrollTrigger: { trigger: badge, start: "top 92%", toggleActions: REPLAY },
          }
        );
      });

      // ─── Section subtitle paragraphs ──────────────────────
      document.querySelectorAll("section > div > p").forEach((p) => {
        gsap.fromTo(
          p,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: p, start: "top 88%", toggleActions: REPLAY },
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="gsap-scroll-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 2,
        background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 99997,
        pointerEvents: "none",
      }}
    />
  );
}
