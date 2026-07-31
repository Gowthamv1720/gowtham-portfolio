"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D Interactive Robot Model with Head Tracking Mouse Cursor
function RobotModel() {
  const robotGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const chestCoreRef = useRef<THREE.Mesh>(null);

  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle floating breathing motion for entire robot body
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = Math.sin(time * 1.8) * 0.12;
      robotGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
    }

    // Dynamic 3D Head Tracking: Rotate head towards cursor position with smooth damping
    if (headGroupRef.current) {
      const targetRotY = mouse.current.x * 0.65; // Horizontal turn
      const targetRotX = -mouse.current.y * 0.45; // Vertical tilt

      headGroupRef.current.rotation.y += (targetRotY - headGroupRef.current.rotation.y) * 0.08;
      headGroupRef.current.rotation.x += (targetRotX - headGroupRef.current.rotation.x) * 0.08;
    }

    // Pulse chest core light
    if (chestCoreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.08;
      chestCoreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, -0.3, 0]}>
      {/* ---------------- ROBOT HEAD (TRACKS CURSOR) ---------------- */}
      <group ref={headGroupRef} position={[0, 1.2, 0]}>
        {/* Main Helmet Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 1.1, 1.1]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Outer Metallic Helmet Shell */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.38, 1.18, 1.05]} />
          <meshStandardMaterial
            color="#1e293b"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Cyber Visor Screen */}
        <mesh position={[0, 0.05, 0.56]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial
            color="#050b14"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Left Glowing Cyan Eye */}
        <mesh ref={leftEyeRef} position={[-0.28, 0.08, 0.58]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Right Glowing Cyan Eye */}
        <mesh ref={rightEyeRef} position={[0.28, 0.08, 0.58]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Eye Visor Glow Light */}
        <pointLight position={[0, 0.08, 0.8]} intensity={1.8} color="#00f0ff" distance={3} />

        {/* Top Antenna */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.98, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={2} />
        </mesh>
        <pointLight position={[0, 0.98, 0]} intensity={1.2} color="#00ff87" distance={2} />

        {/* Ear Bolts */}
        <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ---------------- ROBOT NECK & TORSO ---------------- */}
      {/* Neck Joint */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.25, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>

      {/* Main Chest Armor */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.8, 1.3, 1.1]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Glowing QA Chest Reactor Core */}
      <mesh ref={chestCoreRef} position={[0, -0.1, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
        <meshStandardMaterial
          color="#00ff87"
          emissive="#00ff87"
          emissiveIntensity={2.5}
        />
      </mesh>
      <pointLight position={[0, -0.1, 0.7]} intensity={1.8} color="#00ff87" distance={4} />

      {/* Shoulder Armor Plates */}
      <mesh position={[-1.15, 0.3, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      <mesh position={[1.15, 0.3, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function QARobot3D() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "420px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0.4, 4.2], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[4, -2, 3]} intensity={1.5} color="#00ff87" />

        <RobotModel />
      </Canvas>
    </div>
  );
}
