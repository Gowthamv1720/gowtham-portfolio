"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientShadeField({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry } = useMemo(() => {
    const count = 240;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geometry: geo };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02 + mouse.current[0] * 0.15;
      pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.1 + mouse.current[1] * 0.15;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.12}
        color="#00ff87"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackground() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        background: "radial-gradient(circle at 50% 20%, #0c121e 0%, #05070c 100%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00ff87" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
        <AmbientShadeField mouse={mouse} />
      </Canvas>
    </div>
  );
}
