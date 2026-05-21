"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start off-screen so they don't flash at 0,0
    gsap.set([dot, ring], { x: -100, y: -100 });

    // quickTo = fastest GSAP cursor tracking (no lag)
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Hover state: enlarge ring, change dot color
    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, backgroundColor: "#22d3ee", duration: 0.25, ease: "power2.out" });
      gsap.to(ring, { scale: 1.6, borderColor: "rgba(34,211,238,0.6)", duration: 0.25, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "#a78bfa", duration: 0.25, ease: "power2.out" });
      gsap.to(ring, { scale: 1, borderColor: "rgba(124,58,237,0.5)", duration: 0.25, ease: "power2.out" });
    };

    // Click state: squish
    const onDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 });
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
    };
    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Attach hover to all interactive elements (including future ones via delegation)
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor-hover]").forEach((el) => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attachHover();

    // Re-scan DOM for new elements (e.g. mobile menu opens)
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide cursor when mouse leaves window
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "#a78bfa",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />

      {/* Ring — lags slightly behind for trail effect */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "1.5px solid rgba(124,58,237,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          backdropFilter: "blur(0px)",
        }}
      />
    </>
  );
}
