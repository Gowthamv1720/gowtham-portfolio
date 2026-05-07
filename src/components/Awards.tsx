"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Awards() {
  return (
    <section className={styles.section} id="awards">
      <h2 className="section-title">
        Awards & <span>Recognition</span>
      </h2>
      <div>
        {resumeData.awards.map((award, index) => (
          <motion.div
            key={index}
            className={styles.card}
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div style={{ color: "var(--accent)", marginTop: "0.2rem" }}>
              <Trophy size={24} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>{award.title}</h3>
              <p style={{ color: "var(--text-primary)" }}>{award.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
