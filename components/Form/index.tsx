/* <DndFile
        accept="image"
        name="archivos"
        loading={false}
        onChange={console.log}
      ></DndFile> */

import axios from "axios";
import { Resource } from "pages/api/resources/get-all";
import { FormEventHandler, useCallback, useState } from "react";

import Explorer from "./Explorer";
import Gallery from "./Gallery";
import Name from "./Name";
import Upload from "./Upload";

import ServerError from "~components/ServerError";
import ServerStatusProvider from "~context/ServerStatus";
import useLocalStorage from "~hooks/useLocalStorage";
import useObjectState from "~hooks/useObjectState";

type FormState = {
  name: string;
  step: number;
  uploaded: number | null; // ID in the DB
  reason: string;
  selected: number[];
};

// TODO this approach is ugly, move to context
export default function Form(): JSX.Element {
  const [loading, setLoading] = useState(false);
  // const [submitting, setSubmitting] = useState(false);

  const [localState, setLocalState] = useLocalStorage<FormState>("form", {
    name: "",
    reason: "",
    selected: [],
    step: 0,
    uploaded: null,
  });

  const [form, mergeForm] = useObjectState<FormState>(localState);

  const submitStep = useCallback(() => {
    setLoading(true);
    mergeForm((prev) => {
      const step = prev.step + 1;
      setLocalState({ ...prev, step });
      return { step };
    });
    setLoading(false);
  }, [mergeForm, setLocalState]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      if (!loading) submitStep();
    },
    [loading, submitStep]
  );

  const handleDiscard = useCallback(
    async (resource: Resource, reason: string) => {
      setLoading(true);
      try {
        axios.post("/api/resources/update", {
          id: resource.resource_id,
          reason,
        });
        mergeForm((prev) => {
          const selected = [...prev.selected, resource.resource_id];
          setLocalState({ ...prev, selected });
          return { selected };
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    },
    [mergeForm, setLocalState]
  );

  const handleUpload = useCallback(
    async (file: File, reason: string) => {
      setLoading(true);
      try {
        if (file.size > 5 * 1000 * 100)
          throw new Error("Max file size exceeded");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("lastModified", `${file.lastModified}`);
        formData.append("reason", reason);
        formData.append("name", form.name || "Anónimx");
        const response = await axios.post<Resource>(
          `${process.env.NEXT_PUBLIC_STATIC_URL as string}/resource/create/`,
          formData
        );
        mergeForm((prev) => {
          const uploaded = response.data.resource_id;
          setLocalState({ ...prev, uploaded });
          return { uploaded };
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    },
    [form.name, mergeForm, setLocalState]
  );

  return (
    <ServerStatusProvider>
      <ServerError message="Hubo un error conectando con el servidor, por favor intentá nuevamente más tarde...">
        {form.uploaded ? (
          <Explorer />
        ) : (
          <form
            className="flex flex-col items-center justify-center flex-1 w-full h-full"
            onSubmit={handleSubmit}
          >
            {form.step === 0 && (
              <Name
                loading={loading}
                onChange={(name) => mergeForm({ name })}
                value={form.name}
              />
            )}
            {form.step === 1 && (
              <Gallery
                loading={loading}
                onDiscard={handleDiscard}
                selected={form.selected.length}
                submitStep={submitStep}
              />
            )}
            {form.step === 2 && (
              <Upload loading={loading} onUpload={handleUpload} />
            )}
          </form>
        )}
      </ServerError>
    </ServerStatusProvider>
  );
}
