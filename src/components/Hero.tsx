"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import styles from "./components.module.css";

export default function Hero() {
  const { name, role } = resumeData.personalInfo;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className={`${styles.heroTitle} text-gradient`}>
            {name}
          </h1>

          <p className={styles.heroRole}>
            {role}
          </p>

          <p className={styles.heroDesc}>
            Ensuring software & machine learning pipelines operate flawlessly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
