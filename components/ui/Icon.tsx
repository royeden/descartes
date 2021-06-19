import {
  FaCaretLeft,
  FaCaretRight,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";

const ICONS = {
  "caret-left": FaCaretLeft,
  "caret-right": FaCaretRight,
  "volume-down": FaVolumeDown,
  "volume-mute": FaVolumeMute,
  "volume-off": FaVolumeOff,
  "volume-up": FaVolumeUp,
};

type Props = {
  className?: string;
  size?: string | number;
  type: keyof typeof ICONS;
};

export default function Icon({
  className = "",
  size = "1rem",
  type,
}: Props): JSX.Element {
  const MappedIcon = ICONS[type];
  return (
    <span role="img" aria-label={type.replace("-", "")} className={className}>
      <MappedIcon size={size} />
    </span>
  );
}
