"use client";

import { motion } from "framer-motion";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>
      <div className={styles.projectsGrid}>
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: index * 0.2, staggerChildren: 0.1 },
              },
            }}
          >
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
              {project.description}
            </p>
            <ul className={styles.bulletList}>
              {project.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {bullet}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className={styles.skillTags}
              style={{ marginTop: "1rem" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.3 },
                },
              }}
            >
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className={styles.skillTag}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
