"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import ProgressBar from "@/components/ProgressBar";

// Dynamically import ThreeBackground to avoid SSR issues with canvas
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <ProgressBar />
      <ThreeBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Summary />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Awards />
        <footer style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
          <p>© {new Date().getFullYear()} Gowtham Velusamy. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
