import clsx from "clsx";
import { ReactNode } from "react";

import useDndFile, {
  FilesChange,
  FilesWithType,
  ValidMIME,
} from "../../lib/hooks/_useDndFile";

type Props = {
  accept: ValidMIME | ValidMIME[];
  className?: string;
  children?: ReactNode;
  files: FilesWithType[];
  loading: boolean;
  name: string;
  multiple?: boolean;
  onChange: (change: FilesChange) => void;
};

export default function DndFile({
  accept,
  children,
  className = "",
  files,
  loading,
  name,
  multiple,
  onChange,
}: Props): JSX.Element {
  const { drag, drop, dragging, input } = useDndFile({
    accept,
    files,
    onChange,
  });
  return (
    <label
      className={clsx(
        className,
        "cursor-pointer border-2 transition-colors duration-300 ease-in-out flex items-center justify-center p-4 rounded",
        {
          "border-dashed border-black hover:border-purple-600 focus-within:border-purple-600":
            !dragging,
          "border-purple-600": dragging,
        }
      )}
      htmlFor={name}
      onDragLeaveCapture={loading ? undefined : drag(false)}
      onDragEnterCapture={loading ? undefined : drag(true)}
      onDrop={loading ? undefined : drop}
    >
      <input
        accept={Array.isArray(accept) ? accept.join(",") : accept}
        className="w-0 h-0"
        id={name}
        multiple={multiple}
        name={name}
        onChange={loading ? undefined : input}
        type="file"
      />
      <span className="pointer-events-none">{children}</span>
    </label>
  );
}
