"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

// 1. QA Automated Test Grid Scanner Shader
function QATestMatrix({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scannerPlaneRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const count = 121; // 11x11 Grid of Test Cases
  const { geometry, positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let idx = 0;
    const size = 11;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        pos[idx * 3] = (i - size / 2) * 1.6;
        pos[idx * 3 + 1] = (j - size / 2) * 1.6;
        pos[idx * 3 + 2] = (Math.random() - 0.5) * 3;
        idx++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, positions: pos };
  }, [count]);

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uScannerY: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorIdle: { value: new THREE.Color("#182030") },
        uColorPass: { value: new THREE.Color("#00ff87") }, // Passed test green
        uColorScan: { value: new THREE.Color("#00f0ff") }, // Laser scan line cyan
        uColorBug: { value: new THREE.Color("#ff0055") },  // Bug alert red
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec3 pos = position;
          
          // Subtle wave movement representing live data execution
          pos.z += sin(pos.x * 1.5 + uTime * 2.0) * 0.25;
          pos.z += cos(pos.y * 1.5 + uTime * 1.5) * 0.25;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 14.0 * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uScannerY;
        uniform vec3 uColorIdle;
        uniform vec3 uColorPass;
        uniform vec3 uColorScan;
        uniform vec3 uColorBug;
        varying vec3 vPosition;

        void main() {
          // Soft circular point particle
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;

          vec3 color = uColorIdle;
          
          // Test Scanner Sweep (Nodes below scanner line are PASSED)
          if (vPosition.y < uScannerY) {
            color = uColorPass;
          }

          // Laser Scanner Beam Highlight
          float scanDistance = abs(vPosition.y - uScannerY);
          if (scanDistance < 0.35) {
            color = uColorScan;
          }

          // Occasional simulated Bug node pulse
          if (abs(vPosition.x - 3.2) < 0.5 && abs(vPosition.y - 1.6) < 0.5) {
            color = uColorBug;
          }
          if (abs(vPosition.x + 4.8) < 0.5 && abs(vPosition.y + 3.2) < 0.5) {
            color = uColorBug;
          }

          gl_FragColor = vec4(color, 0.85 - dist);
        }
      `,
      transparent: true,
      depthWrite: false,
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      // Laser scanner sweeps up and down continuously
      const scannerY = Math.sin(time * 0.9) * 8;
      materialRef.current.uniforms.uScannerY.value = scannerY;
      if (scannerPlaneRef.current) {
        scannerPlaneRef.current.position.y = scannerY;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.2 + mouse.current[0] * 0.3;
      pointsRef.current.rotation.x = Math.cos(time * 0.1) * 0.1 - mouse.current[1] * 0.3;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial ref={materialRef} args={[shaderArgs]} />
      </points>

      {/* Laser Scanner Beam Line Mesh */}
      <mesh ref={scannerPlaneRef} position={[0, 0, 0]}>
        <planeGeometry args={[22, 0.12]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 2. 3D Floating QA Badges & Test Metrics
function FloatingQANodes() {
  return (
    <group>
      {/* 3D Floating [PASS] Test Shield */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-4.5, 3, -1]}>
        <mesh>
          <boxGeometry args={[2.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#00ff87" wireframe transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.35}
          color="#00ff87"
          anchorX="center"
          anchorY="middle"
        >
          [✓ PASS 100%]
        </Text>
      </Float>

      {/* 3D Floating [HTTP 200 OK] API Endpoint */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2} position={[5, 2.5, -2]}>
        <mesh>
          <boxGeometry args={[2.8, 0.8, 0.2]} />
          <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.32}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          API: 200 OK
        </Text>
      </Float>

      {/* 3D Floating [BUG TRACKER] Defect Node */}
      <Float speed={2.4} rotationIntensity={0.8} floatIntensity={1.5} position={[-5, -2.5, -1]}>
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color="#ff0055" wireframe transparent opacity={0.8} />
        </mesh>
        <Text
          position={[0, 1.1, 0]}
          fontSize={0.28}
          color="#ff0055"
          anchorX="center"
          anchorY="middle"
        >
          🐛 JIRA DEFECT
        </Text>
      </Float>

      {/* 3D Floating [SELENIUM AUTOMATION] Badge */}
      <Float speed={2.1} rotationIntensity={0.4} floatIntensity={1.1} position={[4.8, -3, -1.5]}>
        <mesh>
          <boxGeometry args={[3.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#dca568" wireframe transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.3}
          color="#dca568"
          anchorX="center"
          anchorY="middle"
        >
          PYTHON & SELENIUM
        </Text>
      </Float>

      {/* 3D Floating [ML QA PIPELINE] Node */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8} position={[0, -4.5, -3]}>
        <mesh>
          <torusGeometry args={[1.5, 0.04, 16, 50]} />
          <meshStandardMaterial color="#00ff87" transparent opacity={0.6} />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          ML PIPELINE QA
        </Text>
      </Float>
    </group>
  );
}

// 3. Scroll Camera Navigation along QA Testing Corridor
function QACameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
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

    // Smooth camera path along QA testing matrix
    const targetX = Math.sin(progress * Math.PI * 2) * 2.5 + mouse.current[0] * 1.5;
    const targetY = -progress * 7 + Math.cos(progress * Math.PI) * 1.8 - mouse.current[1] * 1.5;
    const targetZ = 7.5 + Math.sin(progress * Math.PI) * 2.5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, -progress * 3.5, 0);
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
        background: "radial-gradient(circle at 50% 30%, #0a111a 0%, #030508 100%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#00ff87" />
        <pointLight position={[-10, -10, -10]} intensity={1.4} color="#00f0ff" />
        <pointLight position={[0, -15, 5]} intensity={1.2} color="#ff0055" />

        <QATestMatrix mouse={mouse} />
        <FloatingQANodes />
        <QACameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
}
