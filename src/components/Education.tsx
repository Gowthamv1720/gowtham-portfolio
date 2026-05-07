"use client";

import { motion } from "framer-motion";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Education() {
  return (
    <section className={styles.section} id="education">
      <h2 className="section-title">
        <span>Education</span>
      </h2>
      <div>
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className={styles.cardTitle}>{edu.degree}</h3>
            <h4 className={styles.cardSubtitle}>{edu.institution}</h4>
            <div className={styles.cardDuration}>{edu.duration}</div>
            <p style={{ color: "var(--text-primary)" }}>{edu.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
