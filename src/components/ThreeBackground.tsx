"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

function AnimatedGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Track mouse if available
    mousePosition.current.x = (state.pointer.x * Math.PI) / 10;
    mousePosition.current.y = (state.pointer.y * Math.PI) / 10;

    if (gridRef.current) {
      // Move the grid to simulate forward movement (like navigating through data)
      gridRef.current.position.z = (gridRef.current.position.z + delta * 2) % 1;
      
      // Slight parallax based on mouse
      gridRef.current.rotation.x = -Math.PI / 2 + mousePosition.current.y * 0.2;
      gridRef.current.rotation.y = mousePosition.current.x * 0.2;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <Grid
        infiniteGrid
        fadeDistance={20}
        sectionColor="#00f0ff"
        cellColor="#ffffff"
        sectionSize={2}
        cellSize={0.5}
        sectionThickness={1}
        cellThickness={0.5}
      />
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: "var(--bg-primary)" }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
        <fog attach="fog" args={["#0a0a0e", 5, 15]} />
        <AnimatedGrid />
      </Canvas>
    </div>
  );
}
