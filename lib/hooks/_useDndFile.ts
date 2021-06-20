import { FileTypeResult, fromBlob } from "file-type/browser";
import {
  DragEventHandler,
  ChangeEventHandler,
  useCallback,
  useState,
  useMemo,
} from "react";

export type ValidMIME = "audio/*" | "image/*";

export type FilesWithType = {
  file: File;
  type: FileTypeResult | undefined;
};

type AnalyzedFiles = FilesWithType & {
  valid: boolean;
};

type ValidateFiles = (filesToValidate: File[]) => Promise<FilesWithType[]>;

export type FilesChange = { loading: boolean } | { files: FilesWithType[] };

type Options = {
  accept: ValidMIME | ValidMIME[];
  files: FilesWithType[];
  onChange: (change: FilesChange) => void;
};

type DragHandler = (enter: boolean) => DragEventHandler;

export type DndFileHook = {
  drag: DragHandler;
  dragging: boolean;
  drop: DragEventHandler;
  input: ChangeEventHandler<HTMLInputElement>;
};

export default function useDndFile({
  accept,
  files,
  onChange,
}: Options): DndFileHook {
  const [dragging, setDragging] = useState(false);
  const currentFiles = useMemo(
    () =>
      new Set(
        files.map(
          ({ file: { lastModified, name } }) => `${name}_${lastModified}`
        )
      ),
    [files]
  );
  const validate = useCallback<ValidateFiles>(
    async (filesToValidate) => {
      onChange({ loading: true });

      const analizedFiles: Array<AnalyzedFiles> = filesToValidate.map(
        (file) => ({
          file,
          type: undefined,
          valid: false,
        })
      );
      try {
        for (let i = 0; i < analizedFiles.length; i++) {
          const fileType = await fromBlob(analizedFiles[i].file);
          analizedFiles[i].type = fileType;
          analizedFiles[i].valid = Boolean(
            fileType &&
              (Array.isArray(accept)
                ? accept.some((type) =>
                    fileType.mime.includes(`${type.split("/")[0]}/`)
                  )
                : fileType.mime.includes(`${accept.split("/")[0]}/`))
          );
        }
      } catch (error) {
        console.error(error);
      }
      onChange({ loading: false });
      return analizedFiles
        .filter(({ valid }) => valid)
        .map(({ file, type }) => ({ file, type }));
    },
    [accept, files]
  );
  const drag = useCallback<DragHandler>(
    (enter) => (event) => {
      event.preventDefault();
      setDragging(enter);
    },
    []
  );
  const drop = useCallback<DragEventHandler>(
    async (event) => {
      const validFiles = await validate(
        Array.from(event.dataTransfer.files).filter(
          ({ lastModified, name }) =>
            !currentFiles.has(`${name}_${lastModified}`)
        )
      );
      onChange({ files: [...files, ...validFiles] });
      event.preventDefault();
      setDragging(false);
    },
    [currentFiles]
  );
  const input = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (event.target.files) {
        const validFiles = await validate(
          Array.from(event.target.files as FileList).filter(
            ({ lastModified, name }) =>
              !currentFiles.has(`${name}_${lastModified}`)
          )
        );
        onChange({ files: [...files, ...validFiles] });
      }
    },
    [currentFiles]
  );
  return {
    drag,
    dragging,
    drop,
    input,
  };
}
