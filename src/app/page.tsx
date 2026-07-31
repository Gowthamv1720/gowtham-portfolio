"use client";

import ThreeBackground from "@/components/ThreeBackground";
import ProgressBar from "@/components/ProgressBar";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Awards from "@/components/Awards";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Interactive Ambient 3D Plain Shade Background */}
      <ThreeBackground />

      {/* Top Scroll Reading Progress */}
      <ProgressBar />

      {/* Ambient Gradient Backdrop Overlays */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "-5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 135, 0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main Content Overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
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
            padding: "3.5rem 2rem",
            color: "var(--text-secondary)",
            borderTop: "1px solid var(--border-color)",
            marginTop: "4rem",
            background: "rgba(5, 5, 8, 0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p style={{ fontSize: "0.95rem", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Gowtham Velusamy • QA, Automation & ML Pipeline Engineer
          </p>
        </footer>
      </div>
    </main>
  );
}
