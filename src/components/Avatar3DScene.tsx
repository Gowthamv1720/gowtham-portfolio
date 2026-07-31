"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Interactive 3D Animated Avatar Scene following mouse cursor movements
function Avatar3DCard({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  // Load user's 3D avatar texture asset
  const avatarTexture = useTexture("/gowtham_3d_avatar.png");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (cardGroupRef.current) {
      // 3D Motion & Parallax: Tilt and rotate 3D avatar frame based on mouse movement
      const targetRotY = mouse.current.x * 0.45;
      const targetRotX = -mouse.current.y * 0.35;
      const targetPosX = mouse.current.x * 0.2;
      const targetPosY = mouse.current.y * 0.2 + Math.sin(time * 1.6) * 0.08;

      cardGroupRef.current.rotation.y += (targetRotY - cardGroupRef.current.rotation.y) * 0.08;
      cardGroupRef.current.rotation.x += (targetRotX - cardGroupRef.current.rotation.x) * 0.08;
      cardGroupRef.current.position.x += (targetPosX - cardGroupRef.current.position.x) * 0.08;
      cardGroupRef.current.position.y += (targetPosY - cardGroupRef.current.position.y) * 0.08;
    }

    // Pulse ambient glow ring
    if (glowMeshRef.current) {
      const opacity = 0.4 + Math.sin(time * 2) * 0.15;
      (glowMeshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <group ref={cardGroupRef} position={[0, 0, 0]}>
      {/* Ambient Neon Backing Shield */}
      <mesh ref={glowMeshRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[2.8, 3.5]} />
        <meshBasicMaterial color="#00ff87" transparent opacity={0.4} />
      </mesh>

      {/* Main 3D Avatar Image Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.7, 3.4]} />
        <meshStandardMaterial
          map={avatarTexture}
          roughness={0.15}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer 3D Neon Border Ring */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[1.35, 1.38, 48]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Avatar3DScene() {
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
    <div style={{ width: "100%", height: "100%", minHeight: "460px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.4} color="#00f0ff" />
        <pointLight position={[4, -2, 3]} intensity={1.4} color="#00ff87" />

        <Avatar3DCard mouse={mouse} />
      </Canvas>
    </div>
  );
}
