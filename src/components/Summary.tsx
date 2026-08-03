"use client";

import { motion } from "framer-motion";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Summary() {
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
              <p style={{ fontSize: "1.2rem", lineHeight: "1.9", color: "var(--text-primary)" }}>
                {resumeData.summary}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
