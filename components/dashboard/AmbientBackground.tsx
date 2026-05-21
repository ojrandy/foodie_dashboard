"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useTheme } from "next-themes";
import { useThemeVariant } from "@/components/theme/ThemeVariantProvider";

const variantColors: Record<string, { dark: string; light: string }> = {
  indigo: { dark: "#8b5cf6", light: "#7c3aed" },
  orange: { dark: "#fb923c", light: "#ea580c" },
  emerald: { dark: "#34d399", light: "#059669" },
  crimson: { dark: "#fb7185", light: "#e11d48" },
};

function ParticleCloud({ color }: { color: string }) {
  const ref = useRef<any>(null);

  const sphere = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    return random.inSphere(positions, { radius: 1.5 }) as Float32Array;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

export function AmbientBackground() {
  const { theme } = useTheme();
  const { variant } = useThemeVariant();
  const isDark = theme === "dark";
  const colors = variantColors[variant] || variantColors.indigo;
  const particleColor = isDark ? colors.dark : colors.light;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleCloud color={particleColor} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}
