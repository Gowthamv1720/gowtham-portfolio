"use client";

import { motion } from "framer-motion";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <h2 className="section-title">
        Technical <span>Skills</span>
      </h2>
      <div className={styles.skillsGrid}>
        {Object.entries(resumeData.skills).map(([category, skills], index) => (
          <motion.div
            key={category}
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, delay: index * 0.1, staggerChildren: 0.05 },
              },
            }}
          >
            <h3 className={styles.skillCategoryTitle}>{category}</h3>
            <div className={styles.skillTags}>
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className={styles.skillTag}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
