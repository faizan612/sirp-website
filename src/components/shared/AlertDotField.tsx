"use client";

/**
 * AlertDotField
 *
 * Renders a proportional field of dots, one per daily alert, where a fixed
 * percentage are "investigated" (accent color) and the rest fade to a dim
 * state. On first scroll into view, all dots render lit, then the ignored
 * majority drains away over ~1.8s. Respects prefers-reduced-motion by
 * rendering the final state immediately.
 *
 * Source figures: Ponemon Institute, The State of SecOps: AI in the SOC, 2026.
 */

import { useEffect, useRef } from "react";

interface AlertDotFieldProps {
  total?: number;
  investigatedRatio?: number;
  litColor?: string;
  dimColor?: string;
  dotSize?: number;
  duration?: number;
  dotFade?: number;
  className?: string;
  /** Descriptor for the lit share, used in the accessible label (e.g. "get investigated"). */
  litLabel?: string;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16
  );
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export default function AlertDotField({
  total = 4330,
  investigatedRatio = 0.37,
  litColor = "#8e2dff",
  dimColor = "#222228",
  dotSize = 4,
  duration = 1800,
  dotFade = 450,
  className,
  litLabel = "get investigated",
}: AlertDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const litRgb = hexToRgb(litColor);
    const dimRgb = hexToRgb(dimColor);

    const rand = mulberry32(4330);
    const litCount = Math.round(total * investigatedRatio);
    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const isLit = new Uint8Array(total);
    for (let i = 0; i < litCount; i++) isLit[indices[i]] = 1;
    const delays = new Float32Array(total);
    for (let i = 0; i < total; i++) delays[i] = rand() * (duration - dotFade);

    let raf = 0;
    let cols = 0;
    let size = dotSize;
    let gap = 0;

    function layout() {
      const cssWidth = wrap!.clientWidth;
      size = cssWidth < 480 ? 3 : dotSize;
      gap = Math.max(2, Math.round(size * 0.75));
      const pitch = size + gap;
      cols = Math.max(1, Math.floor((cssWidth + gap) / pitch));
      const rows = Math.ceil(total / cols);
      const cssHeight = rows * pitch - gap;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = cssWidth * dpr;
      canvas!.height = cssHeight * dpr;
      canvas!.style.width = `${cssWidth}px`;
      canvas!.style.height = `${cssHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(progress: number) {
      ctx!.clearRect(0, 0, canvas!.clientWidth, canvas!.clientHeight);
      const pitch = size + gap;
      const elapsed = progress * duration;

      for (let i = 0; i < total; i++) {
        const x = (i % cols) * pitch;
        const y = Math.floor(i / cols) * pitch;

        if (isLit[i]) {
          ctx!.fillStyle = litColor;
        } else {
          const t = Math.min(Math.max((elapsed - delays[i]) / dotFade, 0), 1);
          const e = t * t * (3 - 2 * t);
          const r = Math.round(litRgb[0] + (dimRgb[0] - litRgb[0]) * e);
          const g = Math.round(litRgb[1] + (dimRgb[1] - litRgb[1]) * e);
          const b = Math.round(litRgb[2] + (dimRgb[2] - litRgb[2]) * e);
          ctx!.fillStyle = `rgb(${r},${g},${b})`;
        }
        ctx!.fillRect(x, y, size, size);
      }
    }

    function animate() {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        draw(progress);
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    layout();
    draw(reducedMotion ? 1 : 0);

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          if (!reducedMotion) animate();
          else draw(1);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(canvas);

    const ro = new ResizeObserver(() => {
      layout();
      draw(played || reducedMotion ? 1 : 0);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
    };
  }, [total, investigatedRatio, litColor, dimColor, dotSize, duration, dotFade]);

  const litCount = Math.round(total * investigatedRatio);

  return (
    <div ref={wrapRef} className={className} style={{ width: "100%" }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${total.toLocaleString()} dots representing daily security alerts. ${litCount.toLocaleString()} are highlighted, the ${Math.round(
          investigatedRatio * 100
        )} percent that ${litLabel}. The remaining ${(
          total - litCount
        ).toLocaleString()} are dimmed.`}
        style={{ display: "block" }}
      />
    </div>
  );
}
