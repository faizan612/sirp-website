import styles from "./motion-visualization.module.css";

export function MotionVisualization() {
  return (
    <div className={styles.viewport}>
      <iframe
        src="/homepage/figma/motion/omnisense-im-widget.html"
        title="OmniSense live incident-management flow"
        loading="lazy"
        scrolling="no"
        className={styles.widget}
      />
    </div>
  );
}
