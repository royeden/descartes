import dynamic from "next/dynamic";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const AudioPlayer = dynamic(() => import("~components/Audioplayer"), {
  ssr: false,
});

export type SoundContextType = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  volume: number;
};

export const SoundContext = createContext<SoundContextType>(null!);

const { Provider } = SoundContext;

type Props = {
  children: ReactNode;
};

export default function SoundProvider({ children }: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <Provider
      value={{
        playing,
        setPlaying,
        setVolume,
        volume,
      }}
    >
      <AudioPlayer playing={playing} volume={volume} />
      {children}
    </Provider>
  );
}
