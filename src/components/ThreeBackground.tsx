"use client";

export default function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(135deg, #0d1527 0%, #070b14 50%, #03050a 100%)",
      }}
    />
  );
}
