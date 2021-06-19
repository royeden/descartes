import { Resource, ResourcesResponse } from "pages/api/resources/get-all";
import { useCallback, useContext, useRef, useState } from "react";
import { Vector3 } from "three";

import LCanvas from "./Canvas";
import FlyControlsInstructions from "./FlyControlsIntructions";
import Resources from "./Resources";

import Button from "~components/ui/button";
import { SoundContext } from "~context/SoundContext";
import useMobileDetect from "~hooks/useMobileDetect";

export default function Viewer({ resources }: ResourcesResponse): JSX.Element {
  const detectMobile = useMobileDetect();
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [currentResource, setCurrentResource] =
    useState<Resource | undefined>();

  const [positionVector] = useState(new Vector3(0, 0, 5));
  const [reducerVector] = useState(new Vector3());
  const cameraPosition = useRef<HTMLSpanElement>(null);

  const handleCameraUpdate = useCallback(
    (position: Vector3) => {
      if (cameraPosition.current) {
        // TODO optimize this :P
        resources.reduce((prev, { x, y, z }) => {
          positionVector.set(x as number, y as number, z as number);
          const currentDistance = positionVector.distanceTo(position);

          if (currentDistance < prev) {
            reducerVector.copy(positionVector);
            return currentDistance;
          } else return prev;
        }, Number.MAX_SAFE_INTEGER);
        reducerVector.copy(reducerVector);
        cameraPosition.current.innerText = `X: ${position.x.toFixed(
          2
        )}, Y: ${position.y.toFixed(2)}, Z: ${position.z.toFixed(
          2
        )}\nImagen más cercana: X: ${reducerVector.x}, Y: ${
          reducerVector.y
        }, Z: ${reducerVector.z}`;
      }
    },
    [positionVector, reducerVector, resources]
  );

  const { setPlaying } = useContext(SoundContext);

  return (
    <div className="relative flex-1">
      <LCanvas
        className="bg-black"
        hasFly={controlsEnabled && !detectMobile.isMobile()}
        hasOrbit={controlsEnabled && detectMobile.isMobile()}
      >
        <Resources
          onCameraUpdate={handleCameraUpdate}
          onSelect={(resource) => {
            setControlsEnabled(false);
            setCurrentResource(resource);
          }}
          resources={resources}
        />
        <ambientLight position={[0, 0, 0]} intensity={0.8} />
        <pointLight intensity={1} position={[0, 0, 0]} />
      </LCanvas>
      {/* TODO move UI to component */}
      <div className="absolute inset-0 text-white pointer-events-none text-md lg:text-lg">
        {/* TODO fix this button inside every place of the flow */}
        {controlsEnabled ? (
          <div className="p-2 text-left transition-colors bg-black bg-opacity-50 pointer-events-auto hover:bg-opacity-75 max-w-max">
            {!detectMobile.isMobile() && <FlyControlsInstructions />}
            Posición: <span ref={cameraPosition} />
          </div>
        ) : currentResource ? (
          <button
            className="bg-black bg-opacity-75 pointer-events-auto"
            type="button"
            onClick={() => {
              setCurrentResource(undefined);
              setControlsEnabled(true);
            }}
          >
            <h1>{currentResource.name}</h1>
          </button>
        ) : (
          <div className="inset-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
            <h1>Ver basura virtual arder</h1>
            <Button
              className="text-white bg-purple-600 pointer-events-auto focus:bg-purple-500 hover:bg-purple-500"
              onClick={() => {
                setPlaying(true);
                setControlsEnabled(true);
              }}
              type="button"
            >
              Comenzar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
