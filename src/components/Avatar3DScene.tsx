"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// 3D Avatar Image with Dynamic Head Tracking following mouse cursor
function HeadTrackingAvatar({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const avatarTexture = useTexture("/gowtham_3d_avatar.png");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // 3D Head Tracking Motion: Rotates and tilts the character image based on cursor position
      const targetRotY = mouse.current.x * 0.55;  // Head turn horizontal
      const targetRotX = -mouse.current.y * 0.4;  // Head tilt vertical
      const targetRotZ = mouse.current.x * -0.08; // Subtle neck angle

      const targetPosX = mouse.current.x * 0.25;
      const targetPosY = mouse.current.y * 0.25 + Math.sin(time * 1.8) * 0.06; // Floating breathing

      meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.09;
      meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.09;
      meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.09;

      meshRef.current.position.x += (targetPosX - meshRef.current.position.x) * 0.09;
      meshRef.current.position.y += (targetPosY - meshRef.current.position.y) * 0.09;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2.7, 3.4]} />
      <meshStandardMaterial
        map={avatarTexture}
        transparent
        roughness={0.2}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
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
    <div style={{ width: "100%", height: "100%", minHeight: "460px", position: "relative", background: "transparent" }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffffff" />

        <HeadTrackingAvatar mouse={mouse} />
      </Canvas>
    </div>
  );
}
