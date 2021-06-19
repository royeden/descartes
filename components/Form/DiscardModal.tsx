import clsx from "clsx";
import Image from "next/image";
import { Resource } from "pages/api/resources/get-all";
import { ChangeEvent, useEffect, useState } from "react";
import ReactModal from "react-modal";

import Input from "~components/forms/input";
import Icon from "~components/ui/Icon";
import RevealText from "~components/ui/RevealText";
import Button from "~components/ui/button";
import usePrevious from "~hooks/usePrevious";

type Props = {
  handlePrev: () => void;
  handleNext: () => void;
  loading: boolean;
  onDiscard: (resource: Resource, reason: string) => void;
  resource?: Resource;
  setResource: (resource?: Resource) => void;
};

const loader = ({ src }: { src: string }): string =>
  `${process.env.NEXT_PUBLIC_STATIC_URL as string}${src}`;

export default function DiscardModal({
  loading,
  handleNext,
  handlePrev,
  onDiscard,
  resource,
  setResource,
}: Props): JSX.Element {
  const [reason, setReason] = useState("");
  const [discarding, setDiscarding] = useState(false);

  const prevResource = usePrevious<Resource | undefined>(resource);

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
      className="absolute flex flex-col items-center gap-6 overflow-hidden text-white bg-gray-800 md:items-start inset-x-4 md:inset-x-10 rounded-xl focus:outline-none md:grid md:grid-cols-2 md:grid-rows-none"
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
                    <label htmlFor="reason">
                      ¿Qué te hizo elegir esta imagen por sobre las demás?
                    </label>
                    <Input
                      maxLength={1023}
                      className="w-full p-2 my-4 overflow-y-auto transition duration-300 ease-in-out bg-transparent border-2 border-gray-600 rounded shadow-sm hover:border-purple-800 focus:border-purple-800 focus:outline-none focus:ring-1 ring-purple-400 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed scrollbar-thin scrollbar-thumb-rose-400 max-h-36 md:w-auto"
                      type="textarea"
                      value={reason}
                      name="reason"
                      id="reason"
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setReason(event.target.value)
                      }
                    />
                    <Button
                      className="self-center my-2 text-white transition duration-300 ease-in-out shadow active:shadow-none bg-rose-600 hover:bg-rose-500 focus:bg-rose-500 active:bg-pink-400 disabled:bg-gray-700"
                      disabled={!reason || loading}
                      onClick={() => onDiscard(resource, reason)}
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
                  <div className="flex flex-col justify-center">
                    <p>
                      <RevealText text={`Nombre: ${resource.filename}`} />
                    </p>
                    <p>
                      <RevealText
                        text={`Tamaño original: ${resource.original_size}`}
                      />
                    </p>
                    <p>
                      <RevealText text={`Subido por: ${resource.author}`} />
                    </p>
                    <p>
                      <RevealText text={`Tamaño actual: ${resource.size}`} />
                    </p>
                    <Button
                      className="self-center my-2 text-white transition duration-300 ease-in-out shadow active:shadow-none bg-rose-600 hover:bg-rose-500 focus:bg-rose-500 active:bg-pink-400"
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
