"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Code2, Wrench, Sparkles, Layers, Check } from "lucide-react";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

const categoryIcons: Record<string, React.ReactNode> = {
  "Testing Types & Methodologies": <CheckCircle2 size={20} className={styles.skillCategoryIcon} />,
  "Automation & Programming": <Code2 size={20} className={styles.skillCategoryIcon} />,
  "Tools & Infrastructure": <Wrench size={20} className={styles.skillCategoryIcon} />,
  "AI / ML Knowledge": <Sparkles size={20} className={styles.skillCategoryIcon} />,
};

interface TiltCardProps {
  category: string;
  skills: string[];
  index: number;
}

function TiltSkillCard({ category, skills, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      className={styles.tiltCardWrapper}
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`${styles.card} ${styles.tiltSkillCard}`}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic dynamic glare overlay */}
        <motion.div
          className={styles.tiltGlare}
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(0, 255, 135, 0.18) 0%, rgba(0, 240, 255, 0.05) 45%, transparent 70%)`
            ),
          }}
        />

        {/* Card Header with Category Icon and Skill Count Badge */}
        <div className={styles.skillCardHeader}>
          <div className={styles.skillTitleGroup}>
            <div className={styles.skillIconCircle}>
              {categoryIcons[category] || <Layers size={20} />}
            </div>
            <h3 className={styles.skillCategoryTitle}>{category}</h3>
          </div>
          <span className={styles.skillCountBadge}>{skills.length}</span>
        </div>

        {/* Interactive Magnetic Skill Tags */}
        <div className={styles.skillTags}>
          {skills.map((skill, sIdx) => (
            <motion.span
              key={skill}
              className={styles.skillTagInteractive}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: sIdx * 0.02 }}
              whileHover={{
                scale: 1.08,
                y: -3,
                boxShadow: "0 6px 16px rgba(0, 255, 135, 0.22)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              <span className={styles.skillTagDot} />
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Object.keys(resumeData.skills);
  const totalSkillsCount = Object.values(resumeData.skills).reduce(
    (acc, list) => acc + list.length,
    0
  );

  const filteredCategories =
    activeCategory === "All"
      ? Object.entries(resumeData.skills)
      : Object.entries(resumeData.skills).filter(([category]) => category === activeCategory);

  const getShortTabLabel = (cat: string) => {
    if (cat === "Testing Types & Methodologies") return "Testing Methodologies";
    if (cat === "Automation & Programming") return "Automation & Code";
    if (cat === "Tools & Infrastructure") return "Tools & Infra";
    if (cat === "AI / ML Knowledge") return "AI / ML";
    return cat;
  };

  return (
    <section className={styles.section} id="skills">
      <div className={styles.skillsHeaderContainer}>
        <h2 className="section-title">
          Technical <span>Skills</span>
        </h2>
        <p className={styles.skillsSubtitle}>
          Interactive competency matrix spanning Manual QA, Test Automation, CI/CD, and AI/ML pipeline validation.
        </p>
      </div>

      {/* Filter Tabs with Smooth Morphing Active Indicator */}
      <div className={styles.skillsTabsWrapper}>
        <div className={styles.skillsTabs}>
          <button
            type="button"
            className={`${styles.skillsTabBtn} ${activeCategory === "All" ? styles.skillsTabBtnActive : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            {activeCategory === "All" && (
              <motion.div
                layoutId="activeSkillCategoryTab"
                className={styles.skillsTabActiveIndicator}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span className={styles.skillsTabContent}>
              <Layers size={16} />
              All Categories
              <span className={styles.skillsTabPill}>{totalSkillsCount}</span>
            </span>
          </button>

          {categories.map((cat) => {
            const count = resumeData.skills[cat as keyof typeof resumeData.skills]?.length || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`${styles.skillsTabBtn} ${isActive ? styles.skillsTabBtnActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryTab"
                    className={styles.skillsTabActiveIndicator}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className={styles.skillsTabContent}>
                  {categoryIcons[cat]}
                  {getShortTabLabel(cat)}
                  <span className={styles.skillsTabPill}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated 3D Tilt Skill Cards Grid */}
      <motion.div layout className={styles.skillsGrid}>
        <AnimatePresence mode="popLayout">
          {filteredCategories.map(([category, skills], index) => (
            <TiltSkillCard
              key={category}
              category={category}
              skills={skills}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
