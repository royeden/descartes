import { ChangeEvent, useEffect, useMemo, useState } from "react";

import DndFile from "~components/forms/DndFile";
import Input from "~components/forms/input";
import Button from "~components/ui/button";
import useMobileDetect from "~hooks/useMobileDetect";

type Props = {
  loading: boolean;
  onUpload: (file: File, reason: string) => void;
};

export default function Upload({ loading, onUpload }: Props): JSX.Element {
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const detectMobile = useMobileDetect();

  const resourceURL = useMemo(() => file && URL.createObjectURL(file), [file]);

  useEffect(() => {
    if (resourceURL) {
      return () => URL.revokeObjectURL(resourceURL);
    }
  }, [resourceURL]);

  return (
    <>
      {!file && (
        <DndFile
          accept="image/*"
          loading={loading}
          name="archivo"
          onChange={(chosen) => setFile(chosen as File)}
        >
          <p className="text-white">
            {!detectMobile.isMobile()
              ? "Arrastrá un archivo acá o hace click para añadir un archivo"
              : "Tocá acá para añadir un archivo"}
          </p>
        </DndFile>
      )}
      {resourceURL && (
        <div className="flex flex-col justify-center flex-1 h-full pt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resourceURL}
            alt={file?.name}
            className="object-contain w-full"
          />
          <Input
            className="w-full p-2 my-4 overflow-y-auto transition duration-300 ease-in-out bg-transparent border-2 border-gray-600 rounded shadow-sm hover:border-purple-800 focus:border-purple-800 focus:outline-none focus:ring-1 ring-purple-400 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed scrollbar-thin scrollbar-thumb-rose-400 max-h-36 md:w-auto"
            maxLength={1023}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setReason(event.target.value)
            }
            type="textarea"
            value={reason}
          />
          <div className="flex justify-between">
            <Button
              className="w-48 px-4 text-white bg-rose-600 focus:bg-rose-500 hover:bg-rose-500 active:bg-rose-400 disabled:bg-gray-400"
              onClick={() => setFile(undefined)}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="w-48 px-4 text-white bg-purple-600 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400 disabled:bg-gray-400"
              disabled={!reason}
              onClick={() => onUpload(file as File, reason)}
              type="button"
            >
              Subir
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
