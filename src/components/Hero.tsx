"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import styles from "./components.module.css";

export default function Hero() {
  const { name, role, email, phone, location, linkedin } = resumeData.personalInfo;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.statusBadge}
          data-cursor="QA TECH"
        >
          <span className={styles.statusDot} />
          <span>3+ Years STLC & ML QA Engineer</span>
        </motion.div>

        {/* Staggered Name Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className={`${styles.heroTitle} text-gradient`} data-cursor="GOWTHAM">
            {name}
          </h1>
        </motion.div>

        {/* Subtitle Role */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className={styles.heroRole}
        >
          {role} • Manual & Automation QA Specialist
        </motion.h2>

        {/* Core Value Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className={styles.heroDesc}
        >
          Ensuring STLC excellence across web applications, high-throughput backend APIs,
          and AI/ML document intelligence pipelines.
        </motion.p>

        {/* Interactive Skill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className={styles.heroTagContainer}
        >
          {["Manual Testing", "API QA (Postman)", "Python & Selenium", "ML Output Validation", "JIRA Lifecycle"].map(
            (tag, idx) => (
              <span key={idx} className={styles.heroTagPill} data-cursor={tag.toUpperCase()}>
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* Contact Links & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className={styles.heroCtaGroup}
        >
          <a
            href={`mailto:${email}`}
            className={styles.primaryCta}
            data-cursor="HIRE ME"
          >
            Get In Touch
          </a>
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
            data-cursor="LINKEDIN"
          >
            LinkedIn Profile ↗
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Hint */}
      <motion.div
        className={styles.scrollDownIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        data-cursor="SCROLL DOWN"
      >
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollBarLine}>
          <motion.div
            className={styles.scrollBarDot}
            animate={{ y: [0, 24, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
