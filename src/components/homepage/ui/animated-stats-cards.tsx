"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import primaryCardBackground from "../assets/Rectangle 34626737.png";
import progressFill from "../assets/Rectangle 34626739.png";
import annotationLine from "../assets/Rectangle 34627169.png";
import progressFrame from "../assets/Frame 2147224819.png";
import reductionLabel from "../assets/Reduction in MTTD.png";
import fasterMttrLabel from "../assets/Faster MTTR.png";
import mttrTrack from "../assets/Ellipse 1946 (Stroke).png";
import mttrFill from "../assets/MTTR arc.png";
import mttrMarker from "../assets/MTTR marker.png";
import mttrGlow from "../assets/MTTR glow.png";
import investigationFill from "../assets/Ellipse 1947.png";
import investigationMarker from "../assets/Ellipse 1948.png";
import styles from "./animated-stats-cards.module.css";

function useCountUp(target: number, isActive: boolean, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const duration = 1250;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp + delay;
      }

      const elapsed = Math.max(0, timestamp - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setValue(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [delay, isActive, target]);

  return value;
}

function MttrGauge({
  isActive,
  isProgressActive,
}: {
  isActive: boolean;
  isProgressActive: boolean;
}) {
  return (
    <div className={styles.mttrGauge} aria-hidden="true">
      <Image
        src={mttrTrack}
        alt=""
        loading="eager"
        className={styles.mttrTrack}
      />
      <Image
        src={mttrFill}
        alt=""
        loading="eager"
        className={styles.mttrFill}
        data-active={isProgressActive}
      />
      <Image
        src={mttrGlow}
        alt=""
        loading="eager"
        className={styles.mttrGlow}
        data-active={isActive}
      />
      <Image
        src={mttrMarker}
        alt=""
        loading="eager"
        className={styles.mttrMarker}
        data-active={isActive}
      />
    </div>
  );
}

function InvestigationGauge({
  isActive,
  isProgressActive,
}: {
  isActive: boolean;
  isProgressActive: boolean;
}) {
  return (
    <div className={styles.investigationGauge} aria-hidden="true">
      <Image
        src={mttrTrack}
        alt=""
        loading="eager"
        className={styles.investigationTrack}
      />
      <span
        className={styles.investigationFill}
        data-active={isProgressActive}
        style={{
          aspectRatio: `${investigationFill.width} / ${investigationFill.height}`,
          maskImage: `url("${investigationFill.src}")`,
          WebkitMaskImage: `url("${investigationFill.src}")`,
        }}
      />
      <div
        className={styles.investigationGlowClip}
        style={{
          maskImage: `url("${mttrTrack.src}")`,
          WebkitMaskImage: `url("${mttrTrack.src}")`,
        }}
      >
        <svg
          className={styles.investigationGlow}
          data-active={isActive}
          viewBox="0 0 500 367"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="investigation-end-fade" gradientUnits="userSpaceOnUse" x1="357" y1="253" x2="418" y2="330">
              <stop offset="0" stopColor="#CC5E62" />
              <stop offset="0.35" stopColor="#CC5E62" stopOpacity="0.65" />
              <stop offset="1" stopColor="#CC5E62" stopOpacity="0" />
            </linearGradient>
            <filter id="investigation-end-softness" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <path d="M 345 247 A 180 180 0 0 1 420 334" fill="none" stroke="url(#investigation-end-fade)" strokeWidth="32" strokeLinecap="round" filter="url(#investigation-end-softness)" />
        </svg>
      </div>
      <Image
        src={investigationMarker}
        alt=""
        loading="eager"
        className={styles.investigationMarker}
        data-active={isActive}
      />
    </div>
  );
}

export function AnimatedStatsCards() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isMttrProgressActive, setIsMttrProgressActive] = useState(false);
  const [isInvestigationProgressActive, setIsInvestigationProgressActive] =
    useState(false);
  const reduction = useCountUp(90, isActive);
  const investigation = useCountUp(80, isActive, 100);
  const response = useCountUp(70, isActive, 180);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    // The fill starts on a subsequent paint. That guarantees the clipped
    // starting state has been rendered before the transition is requested.
    const mttrTimer = window.setTimeout(() => setIsMttrProgressActive(true), 80);
    const investigationTimer = window.setTimeout(
      () => setIsInvestigationProgressActive(true),
      100,
    );

    return () => {
      window.clearTimeout(mttrTimer);
      window.clearTimeout(investigationTimer);
    };
  }, [isActive]);

  return (
    <div
      ref={elementRef}
      className={styles.statsCards}
      data-active={isActive}
      aria-label="90 percent reduction in MTTD, 80 percent reduction in MTTD, and 70 percent faster MTTR"
  >
      <article className={styles.primaryCard}>
        <Image
          src={primaryCardBackground}
          alt=""
          fill
          priority
          sizes="(max-width: 1536px) 50vw, 828px"
          className={styles.primaryCardBackground}
        />

        <div className={styles.primaryContent}>
          <p className={styles.primaryValue}>{reduction}%</p>
          <Image
            src={reductionLabel}
            alt="Reduction in MTTD"
            width={711}
            height={61}
            className={styles.primaryLabelAsset}
          />
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ "--progress": "83.5%" } as CSSProperties}
          >
            <Image
              src={progressFill}
              alt=""
              fill
              sizes="(max-width: 1536px) 50vw, 641px"
              className={styles.progressFillAsset}
            />
          <div
            className={styles.progressAnnotation}
          >
            <span className={styles.annotationDot} />
            <Image
              src={annotationLine}
              alt=""
              width={16}
              height={552}
              className={styles.annotationLine}
            />
            <span className={styles.annotationLabel}>
              Resolved
              <br />
              autonomously
            </span>
          </div>
          </div>
          <Image
            src={progressFrame}
            alt=""
            fill
            sizes="(max-width: 1536px) 50vw, 768px"
            className={styles.progressFrame}
          />
        </div>
      </article>

      <div className={styles.secondaryCards}>
        <article className={styles.secondaryCard}>
          <div className={styles.investigationValue}>
            <p className={styles.secondaryValue}>{investigation}%</p>
          </div>
          <p className={styles.secondaryLabel}>Reduction in MTTD</p>
          <InvestigationGauge
            isActive={isActive}
            isProgressActive={isInvestigationProgressActive}
          />
        </article>

        <article className={styles.secondaryCard}>
          <p className={styles.secondaryValue}>{response}%</p>
          <Image
            src={fasterMttrLabel}
            alt="Faster MTTR"
            width={477}
            height={60}
            className={styles.mttrLabel}
          />
          <MttrGauge
            isActive={isActive}
            isProgressActive={isMttrProgressActive}
          />
        </article>
      </div>
    </div>
  );
}
