import { Billboard } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Resource, ResourcesResponse } from "pages/api/resources/get-all";
import { Suspense, useCallback } from "react";
import { /* PerspectiveCamera, */ Vector3 } from "three";

import ResourceBillboard from "./ResourceBillboard";

import useMobileDetect from "~hooks/useMobileDetect";

type Props = ResourcesResponse & {
  // far: number;
  // fov: number;
  onCameraUpdate: (position: Vector3) => void;
  onSelect: (resource: Resource) => void;
};

export default function Resources({
  // far,
  // fov,
  onCameraUpdate,
  onSelect,
  resources,
}: Props): JSX.Element {
  const detectMobile = useMobileDetect();
  // const animation = useRef<AnimationState>({
  //   animate: false,
  //   position: new Vector3(),
  //   rotation: new Matrix4(),
  // });

  // const { camera: currentCamera } = useThree();
  useFrame(({ camera }) => {
    // const update =
    //   camera.far !== far || (camera as PerspectiveCamera).fov !== fov;
    // if (camera.far !== far) camera.far = far;
    // if ((camera as PerspectiveCamera).fov !== fov)
    //   (camera as PerspectiveCamera).fov = fov;
    // TODO this should update all mesh as well
    // if (update) camera.updateMatrix();
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
          // const position = event.object.position
          //   .add(event.camera.position)
          //   .divideScalar(2);
          // event.camera.position.x = position.x;
          // event.camera.position.y = position.y;
          // event.camera.position.z = position.z - 1;
        }
        // animation.current = {
        //   animate: true,
        //   position: event.object.position,
        //   rotation: event.camera.matrix,
        // };
      }
      // setClicked(event);
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
