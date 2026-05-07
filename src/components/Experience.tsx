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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: index * 0.2, staggerChildren: 0.1 },
              },
            }}
          >
            <h3 className={styles.cardTitle}>{job.role}</h3>
            <h4 className={styles.cardSubtitle}>{job.company}</h4>
            <div className={styles.cardDuration}>{job.duration}</div>
            <ul className={styles.bulletList}>
              {job.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
