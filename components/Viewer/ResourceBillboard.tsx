import { Billboard } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Resource } from "pages/api/resources/get-all";

import Texture from "./Texture";

export default function ResourceBillboard({
  onClick,
  resource,
}: {
  resource: Resource;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
}): JSX.Element {
  return (
    <Billboard
      onPointerDown={onClick}
      position={[
        resource.x as number,
        resource.y as number,
        resource.z as number,
      ]}
      follow={true} // Follow the camera (default=true)
      lockX={false} // Lock the rotation on the x axis (default=false)
      lockY={false} // Lock the rotation on the y axis (default=false)
      lockZ={false} // Lock the rotation on the z axis (default=false)
    >
      <Texture
        url={`${process.env.NEXT_PUBLIC_STATIC_URL as string}${resource.uri}`}
      />
    </Billboard>
  );
}
