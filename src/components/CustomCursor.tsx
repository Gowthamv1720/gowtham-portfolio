"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothOptions = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, smoothOptions);
  const cursorY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("data-cursor") !== null;

      if (isInteractive) {
        setHovered(true);
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
      } else {
        setHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    >
      {/* Outer Rotating Ring */}
      <motion.div
        style={{
          position: "fixed",
          x: cursorX,
          y: cursorY,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            position: "relative",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rotating Text Arc */}
          <svg
            viewBox="0 0 100 100"
            style={{
              width: "100%",
              height: "100%",
              animation: "spinCursor 12s linear infinite",
            }}
          >
            <path
              id="cursorCirclePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text fill="rgba(0, 255, 135, 0.85)" fontSize="9" letterSpacing="1.8" fontWeight="600">
              <textPath href="#cursorCirclePath">
                {cursorText ? `${cursorText} • ` : "SCROLL • EXPLORE • QA • "}
              </textPath>
            </text>
          </svg>

          {/* Inner Glowing Cursor Point */}
          <motion.div
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00ff87",
              boxShadow: "0 0 14px #00ff87",
            }}
            animate={{
              scale: hovered ? 0.35 : 1,
            }}
          />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes spinCursor {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
