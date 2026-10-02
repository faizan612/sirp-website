"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Selected headings resolve into focus; key statements follow scroll without moving. */
export function TextMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    gsap.registerPlugin(SplitText, ScrollTrigger);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let context: gsap.Context | undefined;
    let splits: SplitText[] = [];

    const stop = () => {
      context?.revert();
      context = undefined;
      splits.forEach(split => split.revert());
      splits = [];
    };
    const start = () => {
      stop();
      if (disposed || preference.matches) return;
      context = gsap.context(() => {
        scope.querySelectorAll<HTMLElement>("[data-text-motion]").forEach(heading => {
          const treatment = heading.dataset.textMotion;
          if (treatment === "scroll") {
            const spokenText = (heading.innerText ?? heading.textContent ?? "").replace(/\s+/g, " ").trim();
            const split = SplitText.create(heading, { type: "words", aria: "auto" });
            heading.setAttribute("aria-label", spokenText);
            splits.push(split);
            gsap.fromTo(split.words, { opacity: 0.45, filter: "blur(6px)" }, {
              opacity: 1, filter: "blur(0px)", duration: 1, stagger: { amount: 0.8 }, ease: "none",
              scrollTrigger: {
                trigger: heading, start: "top 85%", end: "top 40%", scrub: true,
                invalidateOnRefresh: true,
              },
            });
          } else {
            gsap.fromTo(heading, { opacity: 0.55, filter: "blur(6px)" }, {
              opacity: 1, filter: "blur(0px)", duration: treatment === "hero" ? 1.2 : 0.8,
              ease: "power2.out", clearProps: "opacity,filter",
              ...(treatment === "hero" ? {} : {
                scrollTrigger: { trigger: heading, start: "top 85%", once: true },
              }),
            });
          }
        });
      }, scope);
      ScrollTrigger.refresh();
    };
    const preferenceChanged = () => { void document.fonts.ready.then(start); };
    void document.fonts.ready.then(start);
    preference.addEventListener("change", preferenceChanged);
    return () => {
      disposed = true;
      stop();
      preference.removeEventListener("change", preferenceChanged);
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
