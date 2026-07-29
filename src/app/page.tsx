"use client";

import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <ProgressBar />

      {/* Colored Ambient Backdrop Glows */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "-10%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 135, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          right: "-15%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "30%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          filter: "blur(75px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Hero />
        <Summary />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Awards />
        <footer
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            color: "var(--text-secondary)",
            borderTop: "1px solid var(--border-color)",
            marginTop: "4rem",
            background: "var(--bg-secondary)",
          }}
        >
          <p>© {new Date().getFullYear()} Gowtham Velusamy. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
