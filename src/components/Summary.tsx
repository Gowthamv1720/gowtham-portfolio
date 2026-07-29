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
          <div
            style={{
              width: "100%",
              maxWidth: "1040px",
              display: "grid",
              gridTemplateColumns: "1.3fr 0.7fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            <div className={styles.card}>
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

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRight: "1rem" }}>
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
                style={{
                  width: "300px",
                  maxWidth: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
                  cursor: "pointer",
                  transformOrigin: "center center",
                }}
              >
                <img
                  src="/gowtham_portrait.jpg"
                  alt={resumeData.personalInfo.name}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
