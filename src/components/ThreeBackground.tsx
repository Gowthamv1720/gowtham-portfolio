"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Represents a matrix of "test cases" being automatically scanned
function TestScanner() {
  const groupRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate a grid of points representing test cases or data nodes
  const geometry = useMemo(() => {
    const size = 10;
    const count = size * size;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    let idx = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Position them in a grid
        positions[idx * 3] = (i - size / 2) * 1.5;
        positions[idx * 3 + 1] = (j - size / 2) * 1.5;
        positions[idx * 3 + 2] = (Math.random() - 0.5) * 2;
        
        // Base color (grey/idle)
        colors[idx * 3] = 0.3;     // R
        colors[idx * 3 + 1] = 0.3; // G
        colors[idx * 3 + 2] = 0.4; // B
        idx++;
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slowly rotate the entire testing matrix
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.3;
      groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.1;
    }

    // Move the scanner plane back and forth across the Z axis
    if (scannerRef.current) {
      scannerRef.current.position.z = Math.sin(time * 0.8) * 3;
    }

    // Update the shader material with the scanner's Z position so points light up
    if (materialRef.current) {
      materialRef.current.uniforms.uScannerZ.value = scannerRef.current?.position.z || 0;
    }
  });

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uScannerZ: { value: 0 },
        uColorIdle: { value: new THREE.Color("#4a4a5a") },
        uColorPass: { value: new THREE.Color("#00ff88") }, // Bright green for passed test
        uColorScanner: { value: new THREE.Color("#00f0ff") }, // Cyan scanner line
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 12.0 * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uScannerZ;
        uniform vec3 uColorIdle;
        uniform vec3 uColorPass;
        uniform vec3 uColorScanner;
        varying vec3 vPosition;
        
        void main() {
          // Circular point
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          vec3 finalColor = uColorIdle;
          
          // If the scanner has passed this point (scanner Z is greater than point Z)
          // we mark the test as "Passed" (Green)
          if (uScannerZ > vPosition.z) {
            finalColor = mix(uColorPass, uColorIdle, min((uScannerZ - vPosition.z) * 0.5, 1.0));
          }
          
          // If it's exactly on the scanner line, highlight it cyan
          float distToScanner = abs(vPosition.z - uScannerZ);
          if (distToScanner < 0.2) {
            finalColor = uColorScanner;
          }

          gl_FragColor = vec4(finalColor, 0.8 - distanceToCenter);
        }
      `,
      transparent: true,
      depthWrite: false,
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <points geometry={geometry}>
        <shaderMaterial ref={materialRef} args={[shaderArgs]} />
      </points>

      {/* The visible glowing scanner plane */}
      <mesh ref={scannerRef}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: "var(--bg-primary)" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <TestScanner />
      </Canvas>
    </div>
  );
}
