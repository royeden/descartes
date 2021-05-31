import { ThreeEvent } from "@react-three/fiber";
import { Billboard, Stars, useTexture } from "@react-three/drei";
// import { useRouter } from "next/router";
import { Suspense, useCallback, useEffect, useState } from "react";

import LCanvas from "./canvas";
import useMobileDetect from "../../lib/hooks/useMobileDetect";

function MyTexture({ url }: { url: string }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} />;
}

type ViewerProps = {
  images: string[];
};

export default function Viewer({ images }: ViewerProps) {
  const detectMobile = useMobileDetect();
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    if (process.browser) setInBrowser(true);
  }, []);

  // const router = useRouter();
  // const [clicked, setClicked] =
  //   useState<ThreeEvent<MouseEvent> | undefined>(undefined);

  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    // TODO, add animations after clicking an element that's close
    if (event.distance < 20) console.log(event)
    // setClicked(event);
  }, []);

  // TODO add flying instructions

  return (
    <div className="relative flex-1">
      <LCanvas
        hasFly={inBrowser && !detectMobile.isMobile()}
        hasOrbit={inBrowser && detectMobile.isMobile()}
        className="bg-black"
      >
        {images.map((image, i) => (
          <Suspense key={image} fallback={null}>
            <Billboard
              onClick={handleClick}
              position={[
                Math.round(
                  ((Math.random() * images.length) / 32) *
                    (Math.random() > 0.5 ? 1 : -1)
                ),
                Math.round(
                  ((Math.random() * images.length) / 32) *
                    (Math.random() > 0.5 ? 1 : -1)
                ),
                Math.round(
                  ((Math.random() * images.length) / 32) *
                    (Math.random() > 0.5 ? 1 : -1)
                ),
              ]}
              follow={true} // Follow the camera (default=true)
              lockX={false} // Lock the rotation on the x axis (default=false)
              lockY={false} // Lock the rotation on the y axis (default=false)
              lockZ={false} // Lock the rotation on the z axis (default=false)
            >
              {/* <MyTexture url={image} /> */}
              <MyTexture url="/test.png" />
            </Billboard>
          </Suspense>
        ))}
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <ambientLight position={[0, 0, 0]} intensity={0.8} />
        <pointLight intensity={1} position={[0, 0, 0]} />
      </LCanvas>
    </div>
  );
}
