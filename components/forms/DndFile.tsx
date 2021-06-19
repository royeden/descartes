import clsx from "clsx";
import { PropsWithChildren, useRef } from "react";

import useFile from "~hooks/useFile";

type Props = {
  accept: "image/*";
  className?: string;
  loading: boolean;
  name: string;
  multiple?: boolean;
  onChange: (change: null | File | File[]) => void;
};

export default function DndFile({
  accept,
  children,
  className = "",
  loading,
  name,
  multiple = false,
  onChange,
}: PropsWithChildren<Props>): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { change, drag, drop, dragging } = useFile({
    accept,
    multiple,
    onChange,
    ref,
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
        ref={ref}
        accept={Array.isArray(accept) ? accept.join(",") : accept}
        className="w-0 h-0"
        id={name}
        multiple={multiple}
        name={name}
        onChange={loading ? undefined : change}
        type="file"
      />
      <span className="pointer-events-none">{children}</span>
    </label>
  );
}
