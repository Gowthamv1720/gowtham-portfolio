"use client";

import { motion, useScroll } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "var(--accent)",
        boxShadow: "0 0 10px var(--accent-glow)",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
        zIndex: 9999,
      }}
    />
  );
}
