import { useMemo } from "react";

import { Canvas } from "@react-three/fiber";
import { FlyControls, OrbitControls, Preload } from "@react-three/drei";

interface CanvasProps {
  hasFly?: boolean;
  hasOrbit?: boolean;
  children: any;
  className?: string;
}

export default function LCanvas({
  hasFly = true,
  hasOrbit = false,
  children,
  className = ""
}: CanvasProps) {
  // https://github.com/pmndrs/react-three-fiber/issues/1004
  const canvas = useMemo(
    () => (
      <Canvas camera={{
        far: 200,
        fov: 100,
      }} className={className} style={{ position: "absolute" }}>
        <Preload all />

        {hasOrbit && <OrbitControls keyPanSpeed={10} />}
        {hasFly && <FlyControls rollSpeed={0.2} movementSpeed={10} />}
        {children}
      </Canvas>
    ),
    [children, className, hasFly, hasOrbit]
  );

  return <>{canvas}</>;
};
