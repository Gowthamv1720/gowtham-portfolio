"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { resumeData } from "../data/resume";
import styles from "./components.module.css";

const issueTypeItems = [
  { icon: "↑", label: "Improvement", tone: styles.issueImprovement },
  { icon: "✓", label: "Task", tone: styles.issueTask },
  { icon: "◉", label: "Bug", tone: styles.issueBug },
  { icon: "＋", label: "New Feature", tone: styles.issueFeature },
  { icon: "◌", label: "Feature Request", tone: styles.issueFeature },
  { icon: "▥", label: "UX", tone: styles.issueUX },
  { icon: "⚡", label: "Epic", tone: styles.issueEpic },
  { icon: "▣", label: "Sub-task", tone: styles.issueSubtask },
  { icon: "◔", label: "Test sub-task", tone: styles.issueTest },
  { icon: "▶", label: "Test Execution", tone: styles.issueTechnology },
  { icon: "▤", label: "Test Plan", tone: styles.issueTechnology },
  { icon: "◍", label: "Technology", tone: styles.issueTechnology },
  { icon: "○", label: "Incident", tone: styles.issueTest },
  { icon: "◌", label: "Pre-Condition", tone: styles.issueUX },
  { icon: "◎", label: "Test", tone: styles.issueTask },
  { icon: "⌁", label: "Test Set", tone: styles.issueSubtask },
];

export default function Hero() {
  const { name, role, email, linkedin } = resumeData.personalInfo;
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [hoveredIssue, setHoveredIssue] = useState<string | null>(null);

  const handlePortraitMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    const rotateY = (relativeX - 0.5) * 10;
    const rotateX = (0.5 - relativeY) * 10;

    setPortraitTilt({ x: rotateY, y: rotateX });
  };

  const resetPortraitTilt = () => {
    setPortraitTilt({ x: 0, y: 0 });
  };

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

        {/* Right Margin: Pure 3D Character Avatar with Mouse Head Tracking */}
        <motion.div
          className={styles.heroRightCol}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          onMouseMove={handlePortraitMove}
          onMouseLeave={resetPortraitTilt}
        >
          <div className={styles.robotImageWrapper}>
            <div className={styles.robotGlowRing} />
            <motion.div
              className={styles.heroPortraitWrapper}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
            >
              <motion.img
                src="/gowtham_portrait.jpg"
                alt="Animated portrait avatar"
                className={styles.heroPortraitImage}
                animate={{ rotateY: portraitTilt.x, rotateX: portraitTilt.y, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 130, damping: 14, mass: 0.8 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div
        className={styles.heroIssueMarquee}
        aria-label="Issue type marquee"
        onMouseEnter={() => {
          document.documentElement.classList.add('marquee-hover');
          window.dispatchEvent(new CustomEvent('marquee-enter'));
        }}
        onMouseLeave={() => {
          document.documentElement.classList.remove('marquee-hover');
          window.dispatchEvent(new CustomEvent('marquee-leave'));
        }}
      >
        <div className={styles.heroIssueTrack}>
          {[...issueTypeItems, ...issueTypeItems].map((item, index) => {
            const isHovered = hoveredIssue === item.label;
            const isDimmed = hoveredIssue !== null && !isHovered;

            return (
              <div
                className={[
                  styles.heroIssueItem,
                  isHovered ? styles.heroIssueItemActive : "",
                  isDimmed ? styles.heroIssueItemDimmed : "",
                ].join(" ")}
                key={`${item.label}-${index}`}
                onMouseEnter={() => setHoveredIssue(item.label)}
                onMouseLeave={() => setHoveredIssue(null)}
              >
                <span className={`${styles.heroIssueIcon} ${item.tone}`}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
