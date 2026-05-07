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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h3 className={styles.skillCategoryTitle}>{category}</h3>
            <div className={styles.skillTags}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
