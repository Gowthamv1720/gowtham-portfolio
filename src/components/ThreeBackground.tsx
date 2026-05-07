"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSwarm({ count = 3000 }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Track mouse if available
    mousePosition.current.x = (state.pointer.x * Math.PI) / 10;
    mousePosition.current.y = (state.pointer.y * Math.PI) / 10;

    if (points.current) {
      // Base rotation
      points.current.rotation.x -= delta / 15;
      points.current.rotation.y -= delta / 20;

      // Interactive rotation (parallax)
      points.current.rotation.x += (mousePosition.current.y - points.current.rotation.x) * 0.05;
      points.current.rotation.y += (mousePosition.current.x - points.current.rotation.y) * 0.05;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: "var(--bg-primary)" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
