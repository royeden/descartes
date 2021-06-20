import { fromBlob } from "file-type/browser";
import {
  ChangeEventHandler,
  DragEventHandler,
  RefObject,
  useCallback,
} from "react";

import { useDnd } from "./dnd/useDnd";
import { DragHandler } from "./dnd/useDrag";

import { getMimeType, isGenericMimeType } from "~utils/mime";

type Options = {
  accept: string | string[];
  multiple?: boolean;
  onChange: (files: null | File | File[]) => void;
  ref: RefObject<HTMLInputElement>;
};

type FileHook = {
  change: ChangeEventHandler<HTMLInputElement>;
  drag: DragHandler;
  dragging: boolean;
  drop: DragEventHandler;
};

async function validFile(
  file: File,
  accept: string | string[]
): Promise<File | null> {
  const fileType = await fromBlob(file);
  if (fileType) {
    const [type] = getMimeType(fileType.mime);
    return (
      Array.isArray(accept)
        ? accept.some(
            (mime) =>
              mime === fileType.mime ||
              (isGenericMimeType(mime) && mime.includes(type))
          )
        : accept === fileType.mime ||
          (isGenericMimeType(accept) && accept.includes(type))
    )
      ? file
      : null;
  } else return null;
}

export default function useFile({
  accept,
  multiple = false,
  onChange,
  ref,
}: Options): FileHook {
  const handleChange = useCallback(
    async (files: FileList) => {
      const validFiles = await Promise.all(
        Array.from(files).map((file) => validFile(file, accept))
      );
      if (multiple) onChange(validFiles.filter(Boolean) as File[]);
      else onChange(validFiles.find(Boolean) || null);
    },
    [accept, multiple, onChange]
  );

  const change = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (event.target.files) await handleChange(event.target.files);
      if (ref.current) ref.current.value = "";
    },
    [handleChange]
  );

  const onDrop = useCallback<DragEventHandler<HTMLLabelElement>>(
    async (event) => {
      await handleChange(event.dataTransfer.files);
    },
    [handleChange]
  );

  const { drag, dragging, drop } = useDnd({ onDrop });

  return {
    change,
    drag,
    dragging,
    drop,
  };
}
