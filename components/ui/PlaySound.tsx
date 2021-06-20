/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { useContext, useRef } from "react";

import Icon from "./Icon";

import { SoundContext } from "~context/SoundContext";

export default function PlaySound({
  className = "",
}: {
  className?: string;
}): JSX.Element {
  const { playing, setPlaying, setVolume, volume } = useContext(SoundContext);
  const playButton = useRef<HTMLButtonElement>(null!);
  return (
    <div
      onClick={() => playButton.current?.click()}
      className={clsx(
        "flex px-2 cursor-pointer items-center justify-center text-white transition-colors ease-in-out duration-300 bg-transparent hover:bg-opacity-50 focus-within:bg-opacity-50 pointer-events-auto hover:bg-purple-600 focus-within:bg-purple-600",
        className
      )}
    >
      <button
        ref={playButton}
        title={playing ? "Silenciar audio" : "Escuchar audio"}
        className="p-2 transition-colors duration-300 ease-in bg-black bg-opacity-0 rounded-full focus:outline-none focus:bg-opacity-25 active:bg-opacity-50 hover:bg-opacity-25"
        type="button"
        onClick={() => setPlaying((previousState) => !previousState)}
      >
        <Icon
          type={
            playing
              ? volume === 0
                ? "volume-off"
                : volume > 50
                ? "volume-up"
                : "volume-down"
              : "volume-mute"
          }
        />
      </button>
      <input
        className="cursor-pointer"
        onClick={(event) => event.stopPropagation()}
        type="range"
        min="0"
        max="100"
        step="5"
        onChange={(event) => setVolume(parseInt(event.target.value, 10))}
      />
    </div>
  );
}
