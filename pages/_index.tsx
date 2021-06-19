import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Layout } from "../components/Layout";
import DndFile from "../components/forms/_dndFile";
import RevealText from "../components/ui/RevealText";
import Loading from "../components/ui/UploadingFile";
import Button from "../components/ui/button";
import Carousel from "../components/ui/carousel";
import { FilesWithType } from "../lib/hooks/_useDndFile";
import useMobileDetect from "../lib/hooks/useMobileDetect";
import useObjectState from "../lib/hooks/useObjectState";
import upload from "../lib/utils/axios";

const DEFAULT_NAME = "Anonimx";

type Form = {
  count: number;
  files: FilesWithType[];
  loading: boolean;
  name: string;
  submitting: boolean;
  submitted: boolean;
  reason: string;
};

type FormInputEventHandler<T, E> = (key: keyof T) => ChangeEventHandler<E>;

export default function Home(): JSX.Element {
  const detectMobile = useMobileDetect();
  // Prevent inconsistency between server & client
  const [inBrowser, setInBrowser] = useState(false);
  const [form, mergeForm, setForm] = useObjectState<Form>({
    count: 0,
    files: [],
    loading: false,
    name: "",
    reason: "",
    submitted: false,
    submitting: false,
  });

  useEffect(() => {
    if (process.browser) setInBrowser(true);
  }, []);

  const onFiles = useCallback(mergeForm, []);
  const onInput = useCallback<
    FormInputEventHandler<Form, HTMLTextAreaElement | HTMLInputElement>
  >(
    (key) => (event) =>
      mergeForm({
        [key]: event.target.value,
      }),
    [mergeForm]
  );

  const onSubmit = useCallback<FormEventHandler>(
    async (event) => {
      event.preventDefault();
      if (
        form.files.length &&
        form.reason &&
        !form.loading &&
        !form.submitting
      ) {
        mergeForm({ submitting: true });
        try {
          const responses = await Promise.allSettled(
            form.files.map(({ file, type }) => {
              const formData = new FormData();
              formData.append("mime", type?.mime as string);
              formData.append("file", file);
              formData.append("filename", file.name);
              formData.append("lastModified", `${file.lastModified}`);
              formData.append("reason", form.reason);
              formData.append("name", form.name || DEFAULT_NAME);
              return upload("/api/upload", formData);
            })
          );

          console.log(responses);

          mergeForm((previousForm) => ({
            count: previousForm.count + previousForm.files.length,
            files: [],
            submitted: true,
            submitting: false,
          }));
        } catch (error) {
          mergeForm({ submitting: false });
        }
      } else {
        // TODO replace with a nicer alert component
        if (!form.files.length)
          alert("Por favor agregá al menos un archivo para subir");
      }
    },
    [form]
  );
  return (
    <Layout
      className="flex flex-col items-center flex-1 px-5 pt-10 text-center sm:px-20"
      seo={{
        description: "Donde volcar tu basura digital...",
        title: "Basura Digital",
      }}
    >
      <h1 className="text-6xl font-bold">Basura Digital</h1>
      <form className="flex flex-col items-center w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full max-w-lg">
          {form.submitting || form.submitted ? (
            <div className="flex flex-col items-center justify-center w-full h-48">
              <div className="flex items-center">
                <Loading status={form.submitted ? "done" : "loading"} />
                <RevealText
                  text={
                    form.submitted
                      ? `Gracias por aportar tu${form.count > 1 ? "s" : ""} ${
                          form.count > 1 ? `${form.count} ` : ""
                        }archivo${form.count > 1 ? "s" : ""}!`
                      : `Subiendo tu${
                          form.files.length > 1 ? "s" : ""
                        } archivo${form.files.length > 1 ? "s" : ""}...`
                  }
                />
              </div>
              {form.submitted && (
                <Button
                  className="mt-4 text-white bg-purple-600 disabled:bg-gray-400 focus:bg-purple-500 hover:bg-purple-500"
                  onClick={() =>
                    mergeForm({
                      count: 0,
                      name: "",
                      reason: "",
                      submitted: false,
                    })
                  }
                >
                  Subir más
                </Button>
              )}
            </div>
          ) : (
            <DndFile
              accept={["image/*", "audio/*"]}
              className="w-full h-32 my-6"
              files={form.files}
              loading={form.loading}
              multiple
              name="archivos"
              onChange={onFiles}
            >
              <p>
                {inBrowser && !detectMobile.isMobile()
                  ? "Arrastrá un archivo acá o hace click para añadir un archivo"
                  : "Tocá acá para añadir un archivo"}
              </p>
            </DndFile>
          )}
          <label className="w-full pb-4 cursor-pointer" htmlFor="reason">
            ¿Por qué se deben ir estos archivos? ¿Vas a reemplazarlos con otros?
            ¿Qué hace que estos prevalezcan por sobre los otros?
          </label>
          <textarea
            disabled={form.submitting || form.submitted}
            className="p-2 transition mb-4 w-full duration-300 ease-in-out border border-gray-200 rounded shadow-sm hover:border-gray-300 focus:border-gray-300 focus:outline-none max-h-60 min-h-[5rem] focus:ring-1 ring-purple-500 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed"
            name="reason"
            id="reason"
            onChange={onInput("reason")}
            placeholder="Dejá acá escrito lo que quieras..."
            value={form.reason}
            required
          />
          <label className="w-full pb-4 cursor-pointer" htmlFor="name">
            Querés dejarnos tu nombre?
          </label>
          <input
            type="text"
            disabled={form.submitting || form.submitted}
            className="w-full p-2 mb-4 transition duration-300 ease-in-out border border-gray-200 rounded shadow-sm hover:border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-1 ring-purple-500 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed"
            name="name"
            id="name"
            onChange={onInput("name")}
            placeholder="Anónimx..."
            value={form.name}
          />
        </div>
        {Boolean(form.files.length) && (
          <Carousel
            onDelete={
              form.submitting
                ? undefined
                : (index) =>
                    setForm((previousForm) => ({
                      ...previousForm,
                      files: previousForm.files.filter((_, i) => i !== index),
                    }))
            }
            files={form.files}
          />
        )}
        <div>
          <Button
            className="w-48 text-white bg-purple-600 disabled:bg-gray-400 focus:bg-purple-500 hover:bg-purple-500"
            disabled={form.loading || form.submitting}
          >
            Subir
          </Button>
        </div>
      </form>
    </Layout>
  );
}
