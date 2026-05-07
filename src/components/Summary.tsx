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
        <h2 className="section-title">
          Professional <span>Summary</span>
        </h2>
        <div className={styles.card}>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-primary)" }}>
            {resumeData.summary}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
