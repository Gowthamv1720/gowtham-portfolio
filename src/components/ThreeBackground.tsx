"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 1. Interactive 3D Particle Constellation
function ParticleConstellation({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { count, positions, linesGeometry } = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }

    const linesGeometry = new THREE.BufferGeometry();
    return { count, positions, linesGeometry };
  }, []);

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03 + mouse.current[0] * 0.2;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.15 + mouse.current[1] * 0.2;
    }

    // Connect nearby particles with glowing line segments
    if (linesRef.current && pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const linePos: number[] = [];
      const threshold = 3.2;

      for (let i = 0; i < count; i += 2) {
        const x1 = posAttr.getX(i);
        const y1 = posAttr.getY(i);
        const z1 = posAttr.getZ(i);

        for (let j = i + 1; j < count; j += 4) {
          const x2 = posAttr.getX(j);
          const y2 = posAttr.getY(j);
          const z2 = posAttr.getZ(j);

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          if (dist < threshold) {
            linePos.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }

      linesGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePos, 3)
      );
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.14}
          color="#00ff87"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// 2. Central Morphing 3D Cyber QA Scanner & Geometry Node
function CyberNodeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = -time * 0.15;
      outerRef.current.rotation.z = time * 0.25;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.4;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <group position={[3.5, 0.5, -1]}>
      {/* Inner Glowing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#00ff87"
          wireframe
          transparent
          opacity={0.65}
          emissive="#004d28"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Outer Wireframe Sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Floating Scanner Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.2, 0.025, 16, 100]} />
        <meshBasicMaterial color="#00ff87" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// 3. Scroll-Driven Camera Controller
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollYRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const progress = scrollYRef.current;

    // Smoothly interpolate camera 3D position along scroll curve
    const targetX = Math.sin(progress * Math.PI * 2) * 2 + mouse.current[0] * 1.2;
    const targetY = -progress * 6 + Math.cos(progress * Math.PI) * 1.5 - mouse.current[1] * 1.2;
    const targetZ = 8 + Math.sin(progress * Math.PI) * 3;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, -progress * 3, 0);
  });

  return null;
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
        background: "radial-gradient(circle at 50% 30%, #0c121e 0%, #04060a 100%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff87" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#00f0ff" />
        <spotLight position={[0, 15, 5]} intensity={1} color="#ffffff" angle={0.6} />

        <ParticleConstellation mouse={mouse} />
        <CyberNodeCore />
        <CameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
}
