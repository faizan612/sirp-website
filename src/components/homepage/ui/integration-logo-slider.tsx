"use client";

import Image from "next/image";
import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import portSwiggerDevo from "../assets/Frame 2147224547.png";
import ciscoGmail from "../assets/Frame 2147224548.png";
import anyRunAbuseIpdb from "../assets/Frame 2147224549.png";
import phishToolSlack from "../assets/Frame 2147224550.png";
import virusTotalNetWitness from "../assets/Frame 2147224551.png";
import censysImperva from "../assets/Frame 2147224552.png";
import xForceGreyNoise from "../assets/Frame 2147224553.png";
import crowdStrikeDefender from "../assets/Frame 2147224554.png";
import elasticAws from "../assets/Frame 2147224555.png";
import styles from "./integration-logo-slider.module.css";

const integrationColumns = [
  { src: portSwiggerDevo, alt: "PortSwigger and Devo" },
  { src: ciscoGmail, alt: "Cisco and Gmail" },
  { src: anyRunAbuseIpdb, alt: "ANY.RUN and AbuseIPDB" },
  { src: phishToolSlack, alt: "PhishTool and Slack" },
  { src: virusTotalNetWitness, alt: "VirusTotal and NetWitness" },
  { src: censysImperva, alt: "Censys and Imperva" },
  { src: xForceGreyNoise, alt: "IBM X-Force and GreyNoise" },
  { src: crowdStrikeDefender, alt: "CrowdStrike and Microsoft Defender" },
  { src: elasticAws, alt: "Elastic and AWS" },
];

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={styles.logoGroup}
      aria-hidden={duplicate || undefined}
      role={duplicate ? undefined : "list"}
    >
      {integrationColumns.map((column) => (
        <div
          className={styles.logoColumn}
          role={duplicate ? undefined : "listitem"}
          key={`${duplicate ? "duplicate" : "original"}-${column.alt}`}
        >
          <Image
            src={column.src}
            alt={duplicate ? "" : column.alt}
            loading="eager"
            draggable={false}
            className={styles.logoAsset}
          />
        </div>
      ))}
    </div>
  );
}

export function IntegrationLogoSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const columns = track.querySelectorAll<HTMLElement>(
      `.${styles.logoColumn}`,
    );

    const revealAnimation = animate(columns, {
      opacity: [0, 1],
      y: [28, 0],
      scale: [0.96, 1],
      delay: stagger(48),
      duration: 820,
      ease: "outQuint",
    });

    const sliderAnimation = animate(track, {
      x: ["0%", "-50%"],
      duration: 30000,
      ease: "linear",
      loop: true,
    });

    let isVisible = true;
    let isHovered = false;

    const updatePlayback = () => {
      if (isVisible && !isHovered && !document.hidden) {
        sliderAnimation.resume();
      } else {
        sliderAnimation.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.05 },
    );

    const pauseForInspection = () => {
      isHovered = true;
      updatePlayback();
    };

    const resumeAfterInspection = () => {
      isHovered = false;
      updatePlayback();
    };

    observer.observe(viewport);
    viewport.addEventListener("mouseenter", pauseForInspection);
    viewport.addEventListener("mouseleave", resumeAfterInspection);
    document.addEventListener("visibilitychange", updatePlayback);

    return () => {
      observer.disconnect();
      viewport.removeEventListener("mouseenter", pauseForInspection);
      viewport.removeEventListener("mouseleave", resumeAfterInspection);
      document.removeEventListener("visibilitychange", updatePlayback);
      revealAnimation.revert();
      sliderAnimation.revert();
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      aria-label="Supported security integrations"
    >
      <div ref={trackRef} className={styles.track}>
        <LogoGroup />
        <LogoGroup duplicate />
      </div>
    </div>
  );
}
