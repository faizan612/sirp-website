"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LayoutDashboard, ShieldAlert, Sparkles, Workflow } from "lucide-react";
import { Container } from "@/components/homepage/ui/container";

/**
 * "The platform running governed autonomous security." — dark section.
 * Layout follows sirp.io: 1280 container, 100px vertical padding.
 * Centered: eyebrow + serif heading + paragraph + product screen framed in a
 * glowing purple border + closing caption.
 *
 * The screen is a tab switcher. The original Figma export (omniboard.png) baked
 * the frame, the glow, the OmniBoard screen and the four-icon pill bar into a
 * single flat PNG, so none of it could be clicked; frame, glow and pills are
 * rebuilt here so each tab can swap its own screenshot.
 */

type Screen = {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  src?: string;
  alt?: string;
};

const SCREENS: Screen[] = [
  {
    id: "omniboard",
    label: "OmniBoard",
    icon: LayoutDashboard,
    src: "/homepage/figma/platform/screens/omniboard.png",
    alt: "OmniBoard — live security operations overview across all detection sources: 6,145 tickets, severity breakdown, MTTR 0s, MTTD 5m, MTTA 9m",
  },
  {
    id: "playbook-engine",
    label: "Playbook Engine",
    icon: Workflow,
    src: "/homepage/figma/platform/screens/playbook-engine.png",
    alt: "Playbook Engine — live SOC monitor of playbook execution, approvals and errors: 228 enabled playbooks, 37 awaiting human approval, 819 executed in 24h, 21.7s average execution time",
  },
  {
    id: "incident-management",
    label: "Incident Management",
    icon: ShieldAlert,
    src: "/homepage/figma/platform/screens/incident-management.png",
    alt: "Incident Management — OmniSense co-analysis of an OmniStream event confirming an active kernel-mode rootkit threat at 60% confidence, with a live agent timeline alongside",
  },
  {
    id: "co-analyst",
    label: "Agents",
    icon: Sparkles,
    src: "/homepage/figma/platform/screens/co-analyst.png",
    alt: "Agents — configure autonomous investigation agents, including Alert Normalizer, Alert Brief, Entity, Alert Triage, Phishing Analysis and Omni Graph, with their stages and status",
  },
];

export function Platform() {
  const [activeId, setActiveId] = useState(SCREENS[0].id);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const selectable = SCREENS.filter((screen) => screen.src);
  const active = SCREENS.find((screen) => screen.id === activeId) ?? SCREENS[0];

  const onTabKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = selectable.findIndex((screen) => screen.id === id);
    if (index === -1) return;
    const next =
      event.key === "ArrowRight"
        ? selectable[(index + 1) % selectable.length]
        : selectable[(index - 1 + selectable.length) % selectable.length];
    setActiveId(next.id);
    tabRefs.current.get(next.id)?.focus();
  };

  return (
    <section id="omnisense-platform" className="w-full bg-[#0e0e0e] py-16 sm:py-20 lg:py-[100px]">
      <Container>
        <div className="flex flex-col items-center">
          <span className="rounded-full border border-[#323232] bg-[#0f0f0f] px-3 py-1 text-[13px] font-normal text-[#bdbdbd]">
            OmniSense Workbench
          </span>

          <h2 className="mt-4 max-w-[760px] text-center font-serif text-[clamp(36px,4vw,44px)] font-normal leading-[1.18] text-[#f7f7f7]">
            The platform running governed autonomous security.
          </h2>

          <p className="mt-[20px] max-w-[720px] text-center text-[16px] leading-[24px] text-[#8a8a8a]">
            One system from detection through to closure. Investigation, response,
            reporting, and threat intel on shared context, not four tools you
            integrate.
          </p>

          {/* Product screen. The ambient purple bloom stays; the 2px gradient
              ring that used to sit on this edge is gone, leaving the same
              hairline the original composition had. */}
          <div className="mx-auto mt-10 w-full rounded-[16px] border border-[#242424] p-1.5 shadow-[0_0_18px_rgba(190,179,204,0.12)] sm:mt-12 sm:rounded-[24px] lg:w-[87.5vw] lg:max-w-[1680px]">
            {/* Padding is proportional so the composition holds at any width.
                Percentages are measured off the reference: screen inset 4.4%,
                3.7% above it, 2.6% down to the pill bar, 3.3% below. */}
            <div className="relative overflow-hidden rounded-[18px] border border-[#302a38] px-[3.3%] pb-[2.5%] pt-[2.5%]"
              style={{ background: 'radial-gradient(ellipse 65% 80% at 50% 115%, #32134f 0%, #1b0e2c 55%, #0e0b14 100%)' }}>
              {/* The purple bloom that sits behind the pill bar and washes up
                  into the bottom of the screen. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-7%] left-1/2 h-[25%] w-[22%] -translate-x-1/2 rounded-[50%] blur-[22px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(244,231,255,0.88) 0%, rgba(203,170,255,0.4) 35%, rgba(142,45,255,0) 72%)",
                }}
              />

              {/* Fixed aspect box so the panel doesn't jump height between tabs —
                  the exports differ slightly in ratio. Only the active
                  image is exposed, so the panel reads as that screen's alt. */}
              <div
                id="platform-screen"
                role="tabpanel"
                aria-labelledby={`platform-tab-${active.id}`}
                className="relative z-10 aspect-[1624/639] w-full rounded-[16px] bg-[#0b0b0b] ring-1 ring-[#302d25] shadow-[0_0_12px_rgba(204,191,139,0.12)]"
              >
                {SCREENS.filter((screen) => screen.src).map((screen) => (
                  <Image
                    key={screen.id}
                    src={screen.src as string}
                    alt={screen.alt as string}
                    fill
                    // Served as-is rather than through the image optimizer.
                    // These are UI screenshots of thin light text, and the
                    // optimizer can only hurt them here: it never upscales, so
                    // it can't help a source that's already narrower than the
                    // slot, while the WebP re-encode softens the text and the
                    // srcset let the browser pick a 640px candidate off a
                    // not-yet-laid-out `fill` box. The PNGs are 175-381 KB.
                    unoptimized
                    // The first screen is the one on show, so it gets the
                    // preload; the rest are fetched eagerly but unprioritised,
                    // which keeps tab switches instant without competing with
                    // LCP. Lazy loading is wrong here — the inactive screens sit
                    // at the same spot in the viewport and would never resolve.
                    priority={screen.id === SCREENS[0].id}
                    loading={screen.id === SCREENS[0].id ? undefined : "eager"}
                    className={`rounded-[16px] object-contain transition-opacity duration-300 ${
                      screen.id === active.id ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={screen.id !== active.id}
                  />
                ))}
              </div>

              {/* Pill bar */}
              <div
                role="tablist"
                aria-label="OmniSense product screens"
                className="relative z-20 mx-auto mt-[2.6%] flex w-fit items-center gap-1 rounded-[12px] border border-white/20 bg-[#29232f]/90 p-1 shadow-[0_0_20px_rgba(235,218,255,0.4)] backdrop-blur-sm sm:gap-1.5 sm:rounded-[14px] sm:p-1.5"
              >
                {SCREENS.map((screen) => {
                  const Icon = screen.icon;
                  const isActive = screen.id === active.id;
                  const isDisabled = !screen.src;

                  return (
                    <button
                      key={screen.id}
                      ref={(el) => {
                        if (el) tabRefs.current.set(screen.id, el);
                        else tabRefs.current.delete(screen.id);
                      }}
                      type="button"
                      role="tab"
                      id={`platform-tab-${screen.id}`}
                      aria-selected={isActive}
                      aria-controls="platform-screen"
                      aria-label={screen.label}
                      tabIndex={isActive ? 0 : -1}
                      disabled={isDisabled}
                      title={isDisabled ? `${screen.label} — coming soon` : screen.label}
                      onClick={() => setActiveId(screen.id)}
                      onKeyDown={(e) => onTabKeyDown(e, screen.id)}
                      className={`flex h-9 w-10 items-center justify-center rounded-[9px] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#c08bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141419] sm:h-11 sm:w-[46px] sm:rounded-[10px] ${
                        isDisabled
                          ? "cursor-not-allowed text-white/20"
                          : isActive
                            ? "cursor-pointer bg-[#8e2dff] text-white"
                            : "cursor-pointer bg-white/[0.06] text-[#9a9aa5] hover:bg-white/[0.12] hover:text-white"
                      }`}
                    >
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          <p className="mt-[32px] text-center text-[15px] leading-[22px] text-[#8a8a8a]">
            The reasoning is a model. The enforcement is code.
          </p>
        </div>
      </Container>
    </section>
  );
}
