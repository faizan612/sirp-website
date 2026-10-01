"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

/** Only mounted by Home: shared sections on other routes remain static. */
export function HomeHeadingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    gsap.registerPlugin(SplitText);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const played = new WeakSet<Element>();
    const cleanups = new Set<() => void>();
    let observer: IntersectionObserver | undefined;
    let disposed = false;

    const reveal = (heading: HTMLElement) => {
      if (played.has(heading) || preference.matches) return;
      played.add(heading);
      const treatment = heading.dataset.homeHeading;
      let split: SplitText | undefined;
      let animation: gsap.core.Tween | undefined;
      const originalStyle = heading.getAttribute("style");
      const cleanup = () => {
        animation?.kill();
        split?.revert();
        if (originalStyle === null) heading.removeAttribute("style");
        else heading.setAttribute("style", originalStyle);
        cleanups.delete(cleanup);
      };
      cleanups.add(cleanup);

      if (treatment === "autonomy" || treatment === "outcomes") {
        // Keep every word readable and stationary; only the key phrase gains contrast.
        split = SplitText.create(heading, { type: "words", aria: "auto" });
        const phrase = treatment === "autonomy" ? split.words.slice(2) : split.words.slice(-2);
        animation = gsap.fromTo(phrase, { opacity: 0.64 }, {
          opacity: 1, duration: 0.5, ease: "power2.out", onComplete: cleanup,
        });
      } else {
        split = SplitText.create(heading, { type: "lines", aria: "auto" });
        // Group wrapped lines by sentence, so mobile does not become a long stagger.
        const secondPhrase = split.lines.findIndex(line => /^It\s+needs\b/.test(line.textContent?.trim() ?? ""));
        // Reveal across stationary letterforms. Negative insets protect serif overhangs.
        animation = gsap.fromTo(split.lines, { clipPath: "inset(-0.15em 100% -0.15em -0.08em)" }, {
          clipPath: "inset(-0.15em -0.08em -0.15em -0.08em)", duration: 1,
          stagger: (index: number) => secondPhrase >= 0 && index >= secondPhrase ? 0.35 : 0,
          ease: "power1.inOut", onComplete: cleanup,
        });
      }
    };

    const stop = () => {
      observer?.disconnect();
      cleanups.forEach(cleanup => cleanup());
    };
    const start = () => {
      stop();
      if (disposed || preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer?.unobserve(entry.target);
          reveal(entry.target as HTMLElement);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
      // Everything else (Workbench, workflow, integrations, CTA) remains static.
      scope.querySelectorAll<HTMLElement>("[data-home-heading]").forEach(heading => {
        if (!played.has(heading)) observer?.observe(heading);
      });
    };
    // Revert active line wrappers before a resize changes the natural wrapping.
    const resize = () => cleanups.forEach(cleanup => cleanup());
    void document.fonts.ready.then(start);
    preference.addEventListener("change", start);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      disposed = true;
      stop();
      preference.removeEventListener("change", start);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
