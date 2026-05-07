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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
              {project.description}
            </p>
            <ul className={styles.bulletList}>
              {project.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
            <div className={styles.skillTags} style={{ marginTop: "1rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.skillTag}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
