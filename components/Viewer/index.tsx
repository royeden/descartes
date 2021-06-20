import { Resource, ResourcesResponse } from "pages/api/resources/get-all";
import { CenterResponse } from "pages/api/resources/get-center";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

import LCanvas from "./Canvas";
import FlyControlsInstructions from "./FlyControlsIntructions";
import Resources from "./Resources";

import Button from "~components/ui/button";
import { SoundContext } from "~context/SoundContext";
import useMobileDetect from "~hooks/useMobileDetect";

type Props = CenterResponse & ResourcesResponse;

export default function Viewer({ center, resources }: Props): JSX.Element {
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

  const data = useMemo(() => currentResource?.reason ?? [], [currentResource]);

  const [epigraph, ...reasons] = data;

  const { setPlaying } = useContext(SoundContext);

  return (
    <div className="relative flex-1">
      <LCanvas
        center={center}
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
        <ambientLight position={center} intensity={0.8} />
        <pointLight intensity={1} position={center} />
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
            className="w-full h-full text-left pointer-events-auto"
            type="button"
            onClick={() => {
              setCurrentResource(undefined);
              setControlsEnabled(true);
            }}
          >
            <div className="px-4 bg-black bg-opacity-50 hover:bg-opacity-75 w-max">
              <h1 className="text-lg font-bold">{currentResource.name}</h1>
              <p>Nombre: {currentResource.name}.</p>
              <p>Tamaño original: {currentResource.original_size}.</p>
              <p>Tamaño actual: {currentResource.size}.</p>
              {epigraph && (
                <>
                  <p>Epígrafe: </p>
                  <p>{epigraph.content}</p>
                </>
              )}
              {Boolean(reasons.length) && (
                <ul>
                  Motivos de su descarte:
                  {reasons.map(({ resource_id, content }) => (
                    <li className="list-disc list-inside" key={resource_id}>
                      {content}.
                    </li>
                  ))}
                </ul>
              )}
              <p>Click en cualquier lugar para salir.</p>
            </div>
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
