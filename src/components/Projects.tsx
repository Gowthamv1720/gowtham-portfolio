"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./components.module.css";
import { resumeData } from "../data/resume";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.section} id="projects">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>
      <div className={styles.projectsWrapper}>
        <button
          onClick={() => scroll("left")}
          className={`${styles.scrollBtn} ${styles.leftBtn}`}
          aria-label="Previous Project"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className={`${styles.scrollBtn} ${styles.rightBtn}`}
          aria-label="Next Project"
        >
          <ChevronRight size={24} />
        </button>
        <div className={styles.projectsScrollContainer} ref={scrollRef}>
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              className={`${styles.card} ${styles.projectCard}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1, staggerChildren: 0.1 },
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
      </div>
    </section>
  );
}
