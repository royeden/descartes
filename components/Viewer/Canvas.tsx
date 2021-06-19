import { FlyControls, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useMemo } from "react";

import useMobileDetect from "../../lib/hooks/useMobileDetect";

interface CanvasProps {
  children: ReactNode;
  className?: string;
  hasFly?: boolean;
  hasOrbit?: boolean;
}

export default function LCanvas({
  children,
  className = "",
  hasFly = true,
  hasOrbit = false,
}: CanvasProps): JSX.Element {
  const detectMobile = useMobileDetect();
  const isMobile = detectMobile.isMobile();
  // https://github.com/pmndrs/react-three-fiber/issues/1004
  const canvas = useMemo(
    () => (
      <Canvas
        camera={{
          far: isMobile ? 150 : 75,
          fov: 60,
        }}
        className={className}
        style={{ position: "absolute" }}
      >
        <Preload all />

        {hasOrbit && <OrbitControls enableDamping keyPanSpeed={10} />}
        {hasFly && (
          <FlyControls dragToLook rollSpeed={0.2} movementSpeed={10} />
        )}
        {children}
      </Canvas>
    ),
    [children, className, hasFly, hasOrbit, isMobile]
  );

  return <>{canvas}</>;
}
