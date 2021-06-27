import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { ResourceResponse } from "pages/api/resources/get";
import type { Resource } from "pages/api/resources/get-all";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactModal from "react-modal";

import Input from "~components/forms/input";
import Icon from "~components/ui/Icon";
import RevealText from "~components/ui/RevealText";
import Button from "~components/ui/button";
import { FormContext } from "~context/FormContext";
import usePrevious from "~hooks/usePrevious";

type Props = {
  handlePrev: () => void;
  handleNext: () => void;
  resource?: Resource;
  setResource: (resource?: Resource) => void;
};

const loader = ({ src }: { src: string }): string =>
  `${process.env.NEXT_PUBLIC_STATIC_URL as string}${src}`;

export default function DiscardModal({
  handleNext,
  handlePrev,
  resource,
  setResource,
}: Props): JSX.Element {
  const [reason, setReason] = useState("");
  const [discarding, setDiscarding] = useState(false);
  const prevResource = usePrevious<Resource | undefined>(resource);

  const { loading, setLoading, mergeForm } = useContext(FormContext);

  const handleDiscard = useCallback(async () => {
    if (resource && reason && !loading) {
      setLoading(true);
      try {
        const response = await axios.post<ResourceResponse>(
          "/api/resources/update",
          {
            id: resource.resource_id,
            reason,
          }
        );
        if (!response.data.resource) throw new Error("Error updating file");
        mergeForm(({ selected, step }) => ({
          selected: [
            ...selected,
            (response.data.resource as Resource).resource_id,
          ],
          step: step + 1,
        }));
      } catch (error) {
        // TODO add error toast
        console.error(error);
      }
      setLoading(false);
    }
  }, [loading, mergeForm, reason, resource, setLoading]);

  useEffect(() => {
    if (prevResource?.resource_id !== resource?.resource_id) {
      setReason("");
      setDiscarding(false);
    }
  }, [prevResource, resource]);

  return (
    <ReactModal
      isOpen={Boolean(resource)}
      onRequestClose={() => setResource(undefined)}
      contentLabel={resource?.filename}
      overlayClassName={clsx("modal-overlay", {
        "opacity-0": !resource,
        "opacity-100": Boolean(resource),
      })}
      contentElement={(props, children) => (
        <div
          {...props}
          onKeyUpCapture={({ key }) => {
            if (!discarding && key === "ArrowRight") handleNext();
            if (!discarding && key === "ArrowLeft") handlePrev();
          }}
        >
          {children}
        </div>
      )}
      className="absolute flex flex-col items-center gap-6 pb-4 overflow-hidden text-white bg-gray-800 md:items-start inset-x-4 md:inset-x-10 rounded-xl focus:outline-none md:grid md:grid-cols-2 md:grid-rows-none md:pb-0"
      closeTimeoutMS={300}
    >
      <>
        {resource && (
          <>
            <div className="w-full md:col-span-1">
              <Image
                layout="responsive"
                width={128}
                height={128}
                loader={loader}
                alt={resource.filename}
                src={resource.uri}
              />
            </div>
            <div
              className={clsx(
                "flex justify-between md:pt-16 w-full px-2 text-white md:col-span-1",
                {
                  "items-center": !discarding,
                }
              )}
            >
              {discarding ? (
                <div className="flex justify-center w-full">
                  <div className="flex flex-col">
                    <label htmlFor="reason text-sm md:text-base">
                      ¿Qué te hizo elegir esta imagen por sobre las demás?
                    </label>
                    <Input
                      maxLength={1023}
                      className="w-full p-2 my-4 overflow-y-auto transition duration-300 ease-in-out bg-transparent border-2 border-gray-600 rounded shadow-sm hover:border-purple-800 focus:border-purple-800 focus:outline-none focus:ring-1 ring-purple-400 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed scrollbar-thin scrollbar-thumb-fuchsia-400 max-h-36 md:w-auto"
                      type="textarea"
                      value={reason}
                      name="reason"
                      id="reason"
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setReason(event.target.value)
                      }
                    />
                    <Button
                      className="self-center my-2 text-white transition duration-300 ease-in-out shadow active:shadow-none bg-fuchsia-600 hover:bg-fuchsia-500 focus:bg-fuchsia-500 active:bg-pink-400 disabled:bg-gray-700"
                      disabled={!reason || loading}
                      onClick={handleDiscard}
                      type="button"
                    >
                      Descartar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className="flex items-center justify-center p-2 mx-2 text-white transition duration-300 ease-in-out bg-purple-600 rounded-full shadow hover:bg-purple-500 focus:outline-none focus:bg-purple-500 active:bg-purple-400 active:shadow-none"
                    onClick={() => handlePrev()}
                    tabIndex={0}
                    type="button"
                  >
                    <Icon type="caret-left" />
                  </button>
                  <div className="flex flex-col justify-center space-y-2 text-sm md:text-base">
                    <p>
                      <RevealText text={`Nombre: ${resource.filename}`} />
                    </p>
                    <p>
                      <RevealText
                        text={`Tamaño original: ${resource.original_size}`}
                      />
                    </p>
                    <p>
                      <RevealText text={`Tamaño actual: ${resource.size ** 2}`} />
                    </p>
                    <p>
                      <RevealText text={`Subido por: ${resource.author}`} />
                    </p>
                    {resource.reason?.[0] && (
                      <p>
                        <RevealText
                          text={`Epígrafe: ${resource.reason[0].content}`}
                        />
                      </p>
                    )}
                    <Button
                      className="self-center my-2 text-white transition duration-300 ease-in-out shadow active:shadow-none bg-fuchsia-600 hover:bg-fuchsia-500 focus:bg-fuchsia-500 active:bg-pink-400"
                      onClick={() => setDiscarding(true)}
                      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                      tabIndex={2}
                      type="button"
                    >
                      Descartar
                    </Button>
                  </div>
                  <button
                    className="flex items-center justify-center p-2 mx-2 text-white transition duration-300 ease-in-out bg-purple-600 rounded-full shadow hover:bg-purple-500 focus:outline-none focus:bg-purple-500 active:bg-purple-400 active:shadow-none"
                    onClick={() => handleNext()}
                    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                    tabIndex={1}
                    type="button"
                  >
                    <Icon type="caret-right" />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </>
    </ReactModal>
  );
}
