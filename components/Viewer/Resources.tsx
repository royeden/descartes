import { Billboard } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Resource, ResourcesResponse } from "pages/api/resources/get-all";
import { Suspense, useCallback } from "react";
import { /* PerspectiveCamera, */ Vector3 } from "three";

import ResourceBillboard from "./ResourceBillboard";

import useMobileDetect from "~hooks/useMobileDetect";

type Props = ResourcesResponse & {
  onCameraUpdate: (position: Vector3) => void;
  onSelect: (resource: Resource) => void;
};

export default function Resources({
  onCameraUpdate,
  onSelect,
  resources,
}: Props): JSX.Element {
  const detectMobile = useMobileDetect();

  useFrame(({ camera }) => {
    onCameraUpdate(camera.position);
  });

  const handleClick = useCallback(
    (resource: Resource) => (event: ThreeEvent<MouseEvent>) => {
      // TODO, add animations after clicking an element that's close
      if (event.distance < 20) {
        event.stopPropagation();
        onSelect(resource);
        console.log(event, resource);
        if (!detectMobile.isMobile()) {
          event.camera.position.x = event.object.position.x;
          event.camera.position.y = event.object.position.y;
          event.camera.position.z = event.object.position.z - 1;
          event.camera.lookAt(event.object.position);
        } else {
          event.camera.lookAt(event.object.position);
        }
      }
    },
    [detectMobile, onSelect]
  );

  return (
    <>
      {resources.map((resource) => (
        <Suspense
          key={resource.resource_id}
          fallback={
            <Billboard
              position={[
                resource.x as number,
                resource.y as number,
                resource.z as number,
              ]}
            >
              <meshStandardMaterial color={0x4f46e5} />
            </Billboard>
          }
        >
          <ResourceBillboard
            resource={resource}
            onClick={handleClick(resource)}
          />
        </Suspense>
      ))}
    </>
  );
}
