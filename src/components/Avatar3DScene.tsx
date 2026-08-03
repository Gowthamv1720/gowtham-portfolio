"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CartoonAvatar({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const avatarRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const isActive = Math.abs(mouse.current.x) > 0.08 || Math.abs(mouse.current.y) > 0.08;
    const idleBreathe = Math.sin(time * 1.7) * 0.05;
    const idleFold = Math.sin(time * 1.25) * 0.06;

    if (avatarRef.current) {
      avatarRef.current.position.y = -0.45 + idleBreathe;
      avatarRef.current.position.x = 1.5;
      avatarRef.current.rotation.z = isActive ? mouse.current.x * 0.05 : Math.sin(time * 0.6) * 0.015;
      avatarRef.current.rotation.y = isActive ? mouse.current.x * 0.14 : 0.16;
    }

    if (headRef.current) {
      const headLookY = isActive ? mouse.current.x * 0.55 : -0.05;
      const headLookX = isActive ? -mouse.current.y * 0.28 : 0.22;

      headRef.current.rotation.y += (headLookY - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (headLookX - headRef.current.rotation.x) * 0.08;
    }

    if (leftArmRef.current && rightArmRef.current) {
      const leftFold = isActive ? -1.05 + idleFold : -1.22 + idleFold;
      const rightFold = isActive ? 1.05 - idleFold : 1.22 - idleFold;

      leftArmRef.current.rotation.z = leftFold;
      rightArmRef.current.rotation.z = rightFold;
      leftArmRef.current.rotation.x = isActive ? 0.18 : 0.25;
      rightArmRef.current.rotation.x = isActive ? 0.18 : 0.25;
    }

    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 1.4) * 0.025;
      rightLegRef.current.rotation.x = Math.sin(time * 1.4 + 0.6) * 0.025;
    }
  });

  return (
    <group ref={avatarRef} position={[1.5, -0.45, 0]} scale={1.2}>
      <mesh position={[0, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.58, 1.55, 6, 16]} />
        <meshStandardMaterial color="#7a4a2d" roughness={0.72} metalness={0.06} />
      </mesh>

      <group ref={leftArmRef} position={[-0.76, 1.56, 0]} rotation={[0.25, 0, -1.22]}>
        <mesh position={[0, -0.58, 0]} castShadow>
          <capsuleGeometry args={[0.16, 0.92, 6, 12]} />
          <meshStandardMaterial color="#7a4a2d" roughness={0.76} metalness={0.05} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.76, 1.56, 0]} rotation={[0.25, 0, 1.22]}>
        <mesh position={[0, -0.58, 0]} castShadow>
          <capsuleGeometry args={[0.16, 0.92, 6, 12]} />
          <meshStandardMaterial color="#7a4a2d" roughness={0.76} metalness={0.05} />
        </mesh>
      </group>

      <group ref={headRef} position={[0, 2.42, 0.05]} rotation={[0.22, -0.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial color="#f3c9a0" roughness={0.92} />
        </mesh>

        <mesh position={[0, 0.48, -0.03]}>
          <sphereGeometry args={[0.23, 18, 18]} />
          <meshStandardMaterial color="#5a341f" roughness={0.7} />
        </mesh>

        <mesh position={[-0.16, 0.12, 0.5]}>
          <sphereGeometry args={[0.08, 18, 18]} />
          <meshStandardMaterial color="#23150d" roughness={0.9} />
        </mesh>
        <mesh position={[0.16, 0.12, 0.5]}>
          <sphereGeometry args={[0.08, 18, 18]} />
          <meshStandardMaterial color="#23150d" roughness={0.9} />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.3, 0.08, 0]}>
        <mesh position={[0, -0.62, 0]} castShadow>
          <capsuleGeometry args={[0.19, 1.05, 6, 12]} />
          <meshStandardMaterial color="#44312a" roughness={0.82} metalness={0.02} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.3, 0.08, 0]}>
        <mesh position={[0, -0.62, 0]} castShadow>
          <capsuleGeometry args={[0.19, 1.05, 6, 12]} />
          <meshStandardMaterial color="#44312a" roughness={0.82} metalness={0.02} />
        </mesh>
      </group>
    </group>
  );
}

export default function Avatar3DScene() {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 968) {
      return undefined;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "460px", position: "relative", background: "transparent" }}>
      <Canvas camera={{ position: [0, -0.05, 5.2], fov: 30 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 3, 3]} intensity={0.7} color="#9ed8ff" />

        <CartoonAvatar mouse={mouse} />
      </Canvas>
    </div>
  );
}
