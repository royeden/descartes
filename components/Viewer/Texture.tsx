import { useTexture } from "@react-three/drei";

type Props = {
  url: string;
};

export default function Texture({ url }: Props): JSX.Element {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} />;
}
