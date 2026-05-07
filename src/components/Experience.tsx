"use client";

import { motion } from "framer-motion";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      <h2 className="section-title">
        Work <span>Experience</span>
      </h2>
      <div className={styles.experienceContainer}>
        {resumeData.experience.map((job, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className={styles.cardTitle}>{job.role}</h3>
            <h4 className={styles.cardSubtitle}>{job.company}</h4>
            <div className={styles.cardDuration}>{job.duration}</div>
            <ul className={styles.bulletList}>
              {job.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
