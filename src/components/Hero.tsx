"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { useEffect, useState } from "react";

export default function Hero() {
  const { name, role, phone, email, location, linkedin } = resumeData.personalInfo;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        minHeight: "95vh",
        padding: isMobile ? "7rem 1.5rem 3rem 1.5rem" : "8rem 2rem 4rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
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
          <h1
            className="text-gradient"
            style={{
              fontSize: isMobile ? "2.75rem" : "4.25rem",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.7rem",
            }}
          >
            {name}
          </h1>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              color: "var(--accent)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              marginBottom: "0.8rem",
            }}
          >
            {role}
          </p>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              color: "var(--text-primary)",
              fontWeight: 400,
              maxWidth: "680px",
              lineHeight: 1.5,
              marginBottom: "0",
            }}
          >
            Ensuring software & machine learning pipelines operate flawlessly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
