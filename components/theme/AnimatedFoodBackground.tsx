"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function WavyPlane({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = isDark ? "#10b981" : "#059669"; // Emerald tone

  const geometry = useMemo(() => new THREE.PlaneGeometry(30, 30, 30, 30), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.5;
    
    // Animate vertices to create a flowing wave
    const positionAttribute = geometry.getAttribute("position");
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      // Create a pleasant, smooth rolling wave
      const waveX = Math.sin(vertex.x * 0.2 + time) * 1.5;
      const waveY = Math.cos(vertex.y * 0.2 + time) * 1.5;
      const waveXY = Math.sin(vertex.x * 0.1 + vertex.y * 0.1 + time) * 2;
      
      vertex.z = (waveX + waveY + waveXY) * 0.3;
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -5, -10]}>
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.08}
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

export function AnimatedFoodBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fallbackGradients = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_0%_0%,var(--ambient-from)_0%,transparent_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,var(--ambient-via)_0%,transparent_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_100%,var(--ambient-bottom)_0%,transparent_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_100%_100%,var(--ambient-to)_0%,transparent_70%)] opacity-80" />
    </>
  );

  if (!mounted || isMobile) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 mix-blend-screen opacity-70">
        {fallbackGradients}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 mix-blend-screen opacity-70">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: false }}
      >
        <WavyPlane isDark={isDark} />
        {/* Soft fog to blend the edges of the wave */}
        <fog attach="fog" args={[isDark ? '#0b0716' : '#f8f6ff', 5, 25]} />
      </Canvas>
      {fallbackGradients}
    </div>
  );
}
