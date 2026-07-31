"use client";

import { motion } from "framer-motion";
import Avatar3DScene from "./Avatar3DScene";
import { resumeData } from "../data/resume";
import styles from "./components.module.css";

export default function Hero() {
  const { name, role, email, linkedin } = resumeData.personalInfo;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSplitGrid}>
        {/* Left Margin: Name, Designation & Single Sentence */}
        <motion.div
          className={styles.heroLeftCol}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span>3+ Years STLC & ML QA Engineer</span>
          </div>

          {/* Name */}
          <h1 className={`${styles.heroTitle} text-gradient`}>
            {name}
          </h1>

          {/* Designation */}
          <h2 className={styles.heroRole}>
            {role}
          </h2>

          {/* Single Sentence Summary */}
          <p className={styles.heroSingleSentence}>
            Ensuring software & machine learning pipelines operate flawlessly.
          </p>

          {/* Key Skill Tags */}
          <div className={styles.heroTagContainer}>
            {["Manual Testing", "API QA (Postman)", "Python & Selenium", "ML Output QA", "JIRA Defect Tracking"].map(
              (tag, idx) => (
                <span key={idx} className={styles.heroTagPill}>
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className={styles.heroCtaGroup}>
            <a
              href={`mailto:${email}`}
              className={styles.primaryCta}
            >
              Get In Touch
            </a>
            <a
              href={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </motion.div>

        {/* Right Margin: Interactive Animated 3D Avatar Scene */}
        <motion.div
          className={styles.heroRightCol}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.robotImageWrapper}>
            {/* Glowing Backdrop Ring */}
            <div className={styles.robotGlowRing} />

            {/* Interactive 3D Animated Avatar Scene */}
            <div className={styles.robot3DCanvasContainer}>
              <Avatar3DScene />
            </div>

            {/* Floating Live Status Badge */}
            <div className={styles.robotLiveBadge}>
              <span className={styles.robotLiveDot} />
              <span>3D ANIMATED AVATAR • TRACKING CURSOR</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className={styles.scrollDownIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
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
