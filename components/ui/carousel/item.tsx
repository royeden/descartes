import { useEffect, useMemo } from "react";
import { FilesWithType } from "../../../lib/hooks/useDndFile";
import getFileType from "../../../lib/utils/getFileType";

type Props = {
  file: FilesWithType;
};

export default function Item({ file }: Props) {
  const type = useMemo(() => getFileType(file), [file]);
  const resourceURL = useMemo(() => URL.createObjectURL(file.file), [file]);

  useEffect(() => {
    if (resourceURL) {
      return () => URL.revokeObjectURL(resourceURL);
    }
  }, [resourceURL]);

  return (
    <div className="relative flex-shrink-0 w-full max-h-full pb-6">
      <div className="flex flex-col items-center justify-center h-full">
        {type === "audio" && (
          <audio className="max-w-full" controls src={resourceURL} />
        )}
        {type === "image" && (
          <img
            alt={file.file.name}
            src={resourceURL}
            className="object-cover max-h-full border border-gray-200 pointer-events-none"
          />
        )}
        {/* {type === "video" && (
          <video
            controls
            autoPlay
            src={resourceURL}
            className="object-cover max-h-full"
          />
        )} */}
      </div>
      <p className="absolute bottom-0 w-full font-bold text-center text-black">
        {file.file.name}
      </p>
    </div>
  );
}
