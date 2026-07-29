"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroOverlayProps {
  bugReachedCenter: boolean;
  onComplete: () => void;
}

export default function IntroOverlay({ bugReachedCenter, onComplete }: IntroOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    if (bugReachedCenter && step === "loading") {
      setStep("reveal");

      const timer = setTimeout(() => {
        setStep("done");
        setVisible(false);
        onComplete();
      }, 1000); // 1.0s circle expand transition

      return () => clearTimeout(timer);
    }
  }, [bugReachedCenter, step, onComplete]);

  // Lock scroll during preloader
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000000",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            pointerEvents: "none",
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" }
          }}
        >
          {/* Central Glowing Dot */}
          <motion.div
            style={{
              position: "absolute",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "var(--accent)",
              boxShadow: "0 0 40px 20px var(--accent-glow), 0 0 80px 40px rgba(0, 255, 135, 0.15)",
              zIndex: 1,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              step === "loading"
                ? {
                    scale: [0.8, 1.2, 0.8],
                    opacity: 1,
                    transition: {
                      scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                      opacity: { duration: 0.5 },
                    },
                  }
                : {
                    scale: 250,
                    opacity: [1, 1, 0],
                    transition: {
                      scale: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
                      opacity: { duration: 1.0, times: [0, 0.8, 1] }
                    },
                  }
            }
          />

          {/* Welcome Text */}
          <AnimatePresence>
            {step === "loading" && (
              <motion.div
                style={{
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  Welcome to my Portfolio
                </h1>
                
                {/* Loader bar */}
                <div
                  style={{
                    width: "120px",
                    height: "1px",
                    backgroundColor: "rgba(0, 255, 135, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "30%",
                      backgroundColor: "var(--accent)",
                      boxShadow: "0 0 8px var(--accent)",
                    }}
                    animate={{
                      left: ["-30%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
