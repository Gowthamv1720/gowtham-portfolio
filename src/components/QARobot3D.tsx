"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

// 1. 3D Rotating Profile Image Card
function ProfileCard3D({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const cardRef = useRef<THREE.Group>(null);
  const portraitTexture = useTexture("/gowtham_portrait.jpg");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (cardRef.current) {
      // 3D Rotation Effect: Continuous gentle orbit + mouse tilt
      cardRef.current.rotation.y = Math.sin(time * 0.6) * 0.35 + mouse.current.x * 0.4;
      cardRef.current.rotation.x = Math.cos(time * 0.5) * 0.15 - mouse.current.y * 0.3;
      cardRef.current.position.y = Math.sin(time * 1.2) * 0.08;
    }
  });

  return (
    <group ref={cardRef} position={[-1.2, 0, 0]}>
      {/* Outer Glowing Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.75, 2.25, 0.08]} />
        <meshStandardMaterial
          color="#00ff87"
          wireframe
          transparent
          opacity={0.6}
          emissive="#00ff87"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Main Profile Portrait Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 2.1]} />
        <meshStandardMaterial
          map={portraitTexture}
          roughness={0.2}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Back side of Profile Card */}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.6, 2.1]} />
        <meshStandardMaterial color="#0b1320" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Glowing Neon Border Ring */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[0.95, 0.98, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 2. 3D Interactive QA Robot (Head Tracking Cursor)
function RobotModel({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const robotGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const chestCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Floating animation
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = Math.sin(time * 1.5 + 1) * 0.1;
      robotGroupRef.current.rotation.y = Math.cos(time * 0.4) * 0.25;
    }

    // Head turns towards mouse cursor
    if (headGroupRef.current) {
      const targetRotY = mouse.current.x * 0.7;
      const targetRotX = -mouse.current.y * 0.45;

      headGroupRef.current.rotation.y += (targetRotY - headGroupRef.current.rotation.y) * 0.08;
      headGroupRef.current.rotation.x += (targetRotX - headGroupRef.current.rotation.x) * 0.08;
    }

    if (chestCoreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.08;
      chestCoreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={robotGroupRef} position={[1.3, -0.15, 0]}>
      {/* ---------------- ROBOT HEAD ---------------- */}
      <group ref={headGroupRef} position={[0, 1.05, 0]}>
        {/* Main Helmet Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.15, 0.95, 0.95]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Visor Screen */}
        <mesh position={[0, 0.04, 0.49]}>
          <planeGeometry args={[0.95, 0.52]} />
          <meshStandardMaterial color="#040912" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Left Glowing Cyan Eye */}
        <mesh position={[-0.24, 0.06, 0.51]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
        </mesh>

        {/* Right Glowing Cyan Eye */}
        <mesh position={[0.24, 0.06, 0.51]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
        </mesh>

        {/* Top Antenna */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 0.35, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={2} />
        </mesh>

        {/* Ear Bolts */}
        <mesh position={[-0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ---------------- ROBOT TORSO ---------------- */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.2, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>

      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[1.5, 1.1, 0.95]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh ref={chestCoreRef} position={[0, -0.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={2.5} />
      </mesh>

      <mesh position={[-0.95, 0.25, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      <mesh position={[0.95, 0.25, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function QARobot3D() {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "440px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0.2, 4.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[4, -2, 3]} intensity={1.5} color="#00ff87" />

        <ProfileCard3D mouse={mouse} />
        <RobotModel mouse={mouse} />
      </Canvas>
    </div>
  );
}
