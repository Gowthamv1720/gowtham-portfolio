"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Summary() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className={styles.section} id="summary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className={styles.summaryGrid}>
            <div className={`${styles.card} ${styles.summaryCard}`}>
              <h2
                className="section-title"
                style={{
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                Professional <span>Summary</span>
              </h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-primary)" }}>
                {resumeData.summary}
              </p>
            </div>

            <div className={styles.profileImageWrapper}>
              <motion.div
                initial={{ rotate: -10, y: 0, scale: 1 }}
                animate={isHovered
                  ? { rotate: 0, y: 0, scale: 1.04 }
                  : { rotate: [-10, -8, -12, -8, -10], y: [0, -4, 0, 3, 0], scale: 1 }}
                transition={isHovered
                  ? { duration: 0.25, ease: "easeInOut" }
                  : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={styles.profileImageCard}
              >
                <img
                  src="/gowtham_portrait.jpg"
                  alt={resumeData.personalInfo.name}
                  className={styles.profileImage}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
