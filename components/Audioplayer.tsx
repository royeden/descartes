/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react";

const TRACKS = 3;

function randomTrack(): number {
  return Math.floor(Math.random() * TRACKS) + 1;
}

type Props = {
  playing: boolean;
  volume: number;
};

export default function AudioPlayer({ playing, volume }: Props): JSX.Element {
  const player = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(randomTrack);

  useEffect(() => {
    if (playing) {
      player?.current?.play();
    } else {
      player?.current?.pause();
      if (player.current?.currentTime) player.current.currentTime = 0;
    }
  }, [playing]);

  useEffect(() => {
    if (player.current) player.current.volume = volume / 100;
  }, [volume]);

  return (
    <audio
      key={`PISTA_${currentTrack}_320`}
      ref={player}
      onCanPlay={() => {
        if (playing) player.current?.play();
      }}
      onEnded={() => {
        setCurrentTrack((prev) => {
          let newTrack = randomTrack();
          if (newTrack === prev) return ++newTrack > TRACKS ? 1 : newTrack;
          return newTrack;
        });
      }}
      src={`/audio/PISTA_${currentTrack}_320.mp3`}
    />
  );
}
