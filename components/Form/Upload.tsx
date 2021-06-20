import axios from "axios";
import { Resource } from "pages/api/resources/get-all";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import DndFile from "~components/forms/DndFile";
import Input from "~components/forms/input";
import Button from "~components/ui/button";
import { FormContext } from "~context/FormContext";
import useMobileDetect from "~hooks/useMobileDetect";

export default function Upload(): JSX.Element {
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const detectMobile = useMobileDetect();

  const resourceURL = useMemo(() => file && URL.createObjectURL(file), [file]);

  const { form, loading, setLoading, mergeForm } = useContext(FormContext);

  useEffect(() => {
    if (resourceURL) return () => URL.revokeObjectURL(resourceURL);
  }, [resourceURL]);

  const handleUpload = useCallback(async () => {
    if (!loading && reason && file) {
      setLoading(true);
      try {
        if (file.size > 10 * 1000 * 1000)
          throw new Error("Max file size exceeded");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("lastModified", `${file.lastModified}`);
        formData.append("reason", reason);
        formData.append("name", form.name || "Anónimx");
        const response = await axios.post<Resource>(
          `${process.env.NEXT_PUBLIC_STATIC_URL as string}/resource/create`,
          formData
        );
        if (!response.data.resource_id) throw new Error("Couldn't create file");
        mergeForm({
          uploaded: response.data.resource_id as number,
        });
      } catch (error) {
        // TODO add toast
        console.error(error);
      }
      setLoading(false);
    }
  }, [file, form.name, loading, mergeForm, reason, setLoading]);

  return (
    <div className="p-4 space-y-4 text-left md:space-y-8">
      <p>
        Para acceder a la galería, hace falta que hagas un aporte propio de
        material para subir (Tamaño máximo 10MB).
      </p>
      <p>
        Todo lo subido va a recortarse de forma cuadrada para poder entrar en la
        galería.
      </p>
      {!file && (
        <DndFile
          accept="image/*"
          loading={loading}
          name="archivo"
          onChange={(chosen) => setFile(chosen as File)}
        >
          <p className="text-white">
            {!detectMobile.isMobile()
              ? "Arrastrá una imagen acá o hace click para añadir una imagen"
              : "Tocá acá para añadir una imagen"}
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
          <label htmlFor="name" className="font-bold cursor-pointer">
            Ingresá un épigrafe para tu imagen:
          </label>
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
              disabled={loading}
              onClick={() => {
                if (!loading) setFile(undefined);
              }}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="w-48 px-4 text-white bg-purple-600 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400 disabled:bg-gray-400"
              disabled={!reason || loading}
              onClick={handleUpload}
              type="button"
            >
              Subir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
