"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual procedural Ladybug-Leg component
interface CyberLegProps {
  side: "left" | "right";
  type: "front" | "middle" | "back";
  walkSpeed: number;
  walkCycle: number;
}

function CyberLeg({ side, type, walkCycle }: CyberLegProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const tibiaRef = useRef<THREE.Group>(null);

  const sideSign = side === "left" ? -1 : 1;
  
  // Base angles for leg posture
  let baseYaw = 0; 
  let basePitch = 0.2; 

  if (type === "front") {
    baseYaw = 0.6 * sideSign; // Point forward
  } else if (type === "back") {
    baseYaw = -0.7 * sideSign; // Point backward
  }

  useFrame(() => {
    if (!pivotRef.current || !tibiaRef.current) return;

    // Alternating tripod walking gait
    let phaseOffset = 0;
    if (side === "left") {
      if (type === "middle") phaseOffset = Math.PI;
    } else {
      if (type === "front" || type === "back") phaseOffset = Math.PI;
    }

    const cycle = walkCycle + phaseOffset;
    
    // Leg swing
    pivotRef.current.rotation.z = baseYaw + Math.sin(cycle) * 0.35 * sideSign;
    // Leg lift
    pivotRef.current.rotation.x = basePitch + Math.cos(cycle) * 0.25;
    // Tibia bend
    tibiaRef.current.rotation.x = -0.45 + Math.sin(cycle) * 0.15;
  });

  return (
    <group ref={pivotRef}>
      {/* Upper Leg (Femur) */}
      <mesh position={[0.2 * sideSign, 0, -0.05]} rotation={[0, 0, -0.45 * sideSign]}>
        <cylinderGeometry args={[0.016, 0.012, 0.4, 6]} />
        <meshStandardMaterial color="#050508" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Joint & Lower Leg (Tibia) */}
      <group position={[0.35 * sideSign, -0.08, -0.08]} ref={tibiaRef}>
        <mesh position={[0.08 * sideSign, -0.15, 0]} rotation={[0, 0, 0.55 * sideSign]}>
          <cylinderGeometry args={[0.012, 0.007, 0.45, 6]} />
          <meshStandardMaterial color="#020204" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Foot pad */}
        <mesh position={[0.15 * sideSign, -0.35, 0]}>
          <sphereGeometry args={[0.015, 5, 5]} />
          <meshBasicMaterial color="#050508" />
        </mesh>
      </group>
    </group>
  );
}

// Ladybug 3D Model structure (red shell, black body, white head spots)
interface LadybugModelProps {
  scaleVal: number;
  moving: boolean;
  walkCycle: number;
  hovering?: boolean;
}

function LadybugModel({ scaleVal, moving, walkCycle, hovering = false }: LadybugModelProps) {
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Open wings on hover over interactive items
    const targetWingSpread = hovering ? 0.35 : 0.02;
    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = THREE.MathUtils.lerp(leftWingRef.current.rotation.y, targetWingSpread, 0.15);
      rightWingRef.current.rotation.y = THREE.MathUtils.lerp(rightWingRef.current.rotation.y, -targetWingSpread, 0.15);
    }
  });

  return (
    <group scale={[scaleVal, scaleVal, scaleVal]} rotation={[0, 0, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        
        {/* Thorax (Middle Segment) */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#050508" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Abdomen (Round dome-shaped body underneath) */}
        <mesh position={[0, -0.22, 0.04]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#020204" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Head */}
        <group position={[0, 0.32, 0.15]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#050508" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* White Ladybug Spots on Head */}
          <mesh position={[-0.08, 0.08, 0.05]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.08, 0.08, 0.05]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Small Antennae */}
          <group position={[-0.04, 0.15, 0.02]} rotation={[0.2, 0.1, -0.2]}>
            <mesh position={[0, 0.1, 0.02]} rotation={[0.3, 0, 0]}>
              <cylinderGeometry args={[0.005, 0.003, 0.2, 4]} />
              <meshStandardMaterial color="#050508" roughness={0.4} />
            </mesh>
          </group>
          <group position={[0.04, 0.15, 0.02]} rotation={[0.2, -0.1, 0.2]}>
            <mesh position={[0, 0.1, 0.02]} rotation={[0.3, 0, 0]}>
              <cylinderGeometry args={[0.005, 0.003, 0.2, 4]} />
              <meshStandardMaterial color="#050508" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* Glossy Red Wings (Elytra) */}
        {/* Left Wing */}
        <mesh position={[-0.14, -0.16, 0.18]} rotation={[0.05, 0, 0.05]} ref={leftWingRef}>
          <capsuleGeometry args={[0.16, 0.44, 8, 12]} />
          <meshStandardMaterial color="#e63946" roughness={0.05} metalness={0.3} />
          {/* Subtle wing divider lining */}
          <mesh scale={[1.02, 1.02, 1.02]}>
            <capsuleGeometry args={[0.16, 0.44, 4, 8]} />
            <meshBasicMaterial color="#d92e3b" wireframe transparent opacity={0.1} />
          </mesh>
        </mesh>
        
        {/* Right Wing */}
        <mesh position={[0.14, -0.16, 0.18]} rotation={[0.05, 0, -0.05]} ref={rightWingRef}>
          <capsuleGeometry args={[0.16, 0.44, 8, 12]} />
          <meshStandardMaterial color="#e63946" roughness={0.05} metalness={0.3} />
          {/* Subtle wing divider lining */}
          <mesh scale={[1.02, 1.02, 1.02]}>
            <capsuleGeometry args={[0.16, 0.44, 4, 8]} />
            <meshBasicMaterial color="#d92e3b" wireframe transparent opacity={0.1} />
          </mesh>
        </mesh>

        {/* Legs wiggling */}
        {/* Left Side */}
        <group position={[-0.15, 0.15, 0.1]}>
          <CyberLeg side="left" type="front" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>
        <group position={[-0.15, 0, 0.08]}>
          <CyberLeg side="left" type="middle" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>
        <group position={[-0.15, -0.15, 0.06]}>
          <CyberLeg side="left" type="back" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>

        {/* Right Side */}
        <group position={[0.15, 0.15, 0.1]}>
          <CyberLeg side="right" type="front" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>
        <group position={[0.15, 0, 0.08]}>
          <CyberLeg side="right" type="middle" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>
        <group position={[0.15, -0.15, 0.06]}>
          <CyberLeg side="right" type="back" walkSpeed={moving ? 10 : 0} walkCycle={walkCycle} />
        </group>

      </group>
    </group>
  );
}

// 3D Bug for Intro Crawling Phase (Flat Crawl, No Bobbing, No Flying)
interface IntroBugProps {
  introProgress: number;
  stage: "intro" | "reveal" | "fade-to-cursor" | "cursor";
}

function IntroBug({ introProgress, stage }: IntroBugProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [walkCycle, setWalkCycle] = useState(0);

  useFrame(() => {
    if (!groupRef.current) return;

    if (stage === "intro") {
      // Moves left-to-center flatly (No Y bobbing, no tilt)
      groupRef.current.position.x = -6.5 + introProgress * 6.5; 
      groupRef.current.position.y = 0;
      groupRef.current.position.z = 2.2;
      groupRef.current.rotation.z = -Math.PI / 2; // crawling right
      groupRef.current.rotation.x = 0; // Flat
      groupRef.current.rotation.y = 0;
      
      const isMoving = introProgress < 0.99;
      if (isMoving) {
        setWalkCycle((prev) => (prev + 0.5) % (Math.PI * 2));
      } else {
        setWalkCycle((prev) => THREE.MathUtils.lerp(prev, 0, 0.1));
      }
    } else if (stage === "reveal") {
      // Stays completely still and flat in the center
      groupRef.current.position.x = 0;
      groupRef.current.position.y = 0;
      groupRef.current.position.z = 2.2;
      groupRef.current.rotation.z = -Math.PI / 2;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
      setWalkCycle((prev) => THREE.MathUtils.lerp(prev, 0, 0.1));
    } else if (stage === "fade-to-cursor") {
      // Shrinks flat in the center
      const currentScale = groupRef.current.scale.x;
      const targetScale = THREE.MathUtils.lerp(currentScale, 0, 0.2);
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
      setWalkCycle((prev) => THREE.MathUtils.lerp(prev, 0, 0.1));
    }
  });

  return (
    <group ref={groupRef} scale={[0.45, 0.45, 0.45]}>
      <LadybugModel scaleVal={1} moving={introProgress < 0.99 && stage === "intro"} walkCycle={walkCycle} />
    </group>
  );
}

// Custom 3D Mouse Cursor component
function CursorBug() {
  const [moving, setMoving] = useState(false);
  const [angle, setAngle] = useState(0);
  const [hovering, setHovering] = useState(false);
  
  const lastMouse = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hide default system cursor
    document.body.classList.add("hide-default-cursor");
    // initialize CSS variables so the cursor starts off-screen
    document.documentElement.style.setProperty("--cursor-x", "-100px");
    document.documentElement.style.setProperty("--cursor-y", "-100px");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      const dx = x - lastMouse.current.x;
      const dy = y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 1.5) {
        // Face movement direction
        const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;
        setAngle(targetAngle);
        setMoving(true);
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setMoving(false);
        }, 120);
      }
      
      // update CSS variables directly (avoids React re-renders on every mousemove)
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
      lastMouse.current = { x, y };

      // Detect hover over clickable objects to open wings
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.tagName === "A" || 
          target.tagName === "BUTTON" || 
          target.closest("a") !== null || 
          target.closest("button") !== null ||
          target.classList.contains("btn") ||
          target.classList.contains("scrollBtn") ||
          target.classList.contains("skillTag") ||
          target.closest(`[role="button"]`) !== null;
        setHovering(isInteractive);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.classList.remove("hide-default-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "60px",
        height: "60px",
        pointerEvents: "none",
        zIndex: 99999,
        // Use GPU-accelerated transform reading CSS variables updated on mousemove
        transform: "translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) translate(-50%, -50%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[2, 2, 2]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-2, -2, -1]} intensity={0.5} color="#e63946" />
        <directionalLight position={[0, 5, 0]} intensity={1.0} />
        
        <CursorCanvasModel moving={moving} angle={angle} hovering={hovering} />
      </Canvas>
    </div>
  );
}

// Renders the ladybug inside the cursor's Canvas and interpolates its rotation
interface CursorCanvasModelProps {
  moving: boolean;
  angle: number;
  hovering: boolean;
}

function CursorCanvasModel({ moving, angle, hovering }: CursorCanvasModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [walkCycle, setWalkCycle] = useState(0);

  useFrame(() => {
    if (!modelRef.current) return;

    // Smooth shortest path interpolation for rotation
    let currentZ = modelRef.current.rotation.z;
    let diff = angle - currentZ;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    modelRef.current.rotation.z += diff * 0.18;

    if (moving) {
      setWalkCycle((prev) => (prev + 0.65) % (Math.PI * 2));
    } else {
      setWalkCycle((prev) => THREE.MathUtils.lerp(prev, 0, 0.1));
    }
  });

  return (
    <group ref={modelRef}>
      <LadybugModel scaleVal={0.42} moving={moving} walkCycle={walkCycle} hovering={hovering} />
    </group>
  );
}

interface CyberBugCanvasProps {
  introFinished?: boolean;
  onReachCenter?: () => void;
}

export default function CyberBugCanvas({ introFinished = false, onReachCenter }: CyberBugCanvasProps) {
  const [stage, setStage] = useState<"intro" | "reveal" | "fade-to-cursor" | "cursor">("intro");
  const [introProgress, setIntroProgress] = useState(0);
  const [pauseCursor, setPauseCursor] = useState(false);

  // Stable callback ref to avoid resetting the animation useEffect dependency loop
  const onReachCenterRef = useRef(onReachCenter);
  useEffect(() => {
    onReachCenterRef.current = onReachCenter;
  }, [onReachCenter]);

  // 1. Intro sequence crawl
  useEffect(() => {
    if (stage !== "intro") return;

    let start: number | null = null;
    const duration = 2500; 
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setIntroProgress(progress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setStage("reveal");
        onReachCenterRef.current?.();
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [stage]);

  // 2. Handle transition from center bug to cursor mode
  useEffect(() => {
    if (introFinished && (stage === "intro" || stage === "reveal")) {
      setStage("fade-to-cursor");
      
      // Delay before completely switching to custom mouse cursor mode
      const timer = setTimeout(() => {
        setStage("cursor");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [introFinished, stage]);

  // Pause cursor rendering when marquee is hovered (reduce jank)
  useEffect(() => {
    const onEnter = () => setPauseCursor(true);
    const onLeave = () => setPauseCursor(false);
    window.addEventListener('marquee-enter', onEnter as EventListener);
    window.addEventListener('marquee-leave', onLeave as EventListener);
    return () => {
      window.removeEventListener('marquee-enter', onEnter as EventListener);
      window.removeEventListener('marquee-leave', onLeave as EventListener);
    };
  }, []);

  return (
    <>
      {/* Intro Overlay Canvas (visible during loading and reveal stages) */}
      {(stage === "intro" || stage === "reveal" || stage === "fade-to-cursor") && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.5} />
            <pointLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
            <pointLight position={[-5, -5, -2]} intensity={0.5} color="#e63946" />
            <directionalLight position={[0, 10, 0]} intensity={1.0} />
            
            <IntroBug introProgress={introProgress} stage={stage} />
          </Canvas>
        </div>
      )}

      {/* Interactive Cursor Bug Canvas (visible post-intro) */}
      {stage === "cursor" && !pauseCursor && <CursorBug />}
    </>
  );
}
