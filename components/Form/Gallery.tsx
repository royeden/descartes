import clsx from "clsx";
import Image from "next/image";
import type { Resource } from "pages/api/resources/get-all";
import type { LimitedResourcesResponse } from "pages/api/resources/get-limited";
import { useCallback, useContext, useState } from "react";
import useSWR from "swr";

import DiscardModal from "./DiscardModal";

import RevealText from "~components/ui/RevealText";
import { FormContext } from "~context/FormContext";

const loader = ({ src }: { src: string }): string =>
  `${process.env.NEXT_PUBLIC_STATIC_URL as string}${src}`;

export default function Gallery(): JSX.Element {
  const { form } = useContext(FormContext);

  const { data } = useSWR<LimitedResourcesResponse>(
    "/api/resources/get-limited",
    (url) => fetch(url).then((res) => res.json())
  );

  const [resource, setResource] = useState<Resource | undefined>(undefined);

  const handleNext = useCallback(() => {
    if (resource && data?.resources) {
      let currentIndex =
        data.resources.findIndex(
          ({ resource_id: id }) => id === resource.resource_id
        ) + 1;

      if (currentIndex === data.resources.length) currentIndex = 0;
      setResource(data.resources[currentIndex]);
    }
  }, [data, resource]);
  const handlePrev = useCallback(() => {
    if (resource && data?.resources) {
      let currentIndex =
        data.resources.findIndex(
          ({ resource_id: id }) => id === resource.resource_id
        ) - 1;

      if (currentIndex === -1) currentIndex = data.resources.length - 1;
      setResource(data.resources[currentIndex]);
    }
  }, [data, resource]);

  return (
    <div
      className={clsx(
        "w-screen max-w-full max-h-screen overflow-x-hidden text-left text-sm md:text-base",
        {
          "overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rose-400":
            !resource,
          "overflow-y-hidden": Boolean(resource),
        }
      )}
    >
      <DiscardModal
        handleNext={handleNext}
        handlePrev={handlePrev}
        resource={resource}
        setResource={setResource}
      />
      <div className="px-4 pb-4 space-y-4 md:pb-8 md:space-y-8">
        <p>
          <RevealText text="Para participar de la experiencia, es necesario que hagas espacio para la imagen que vas a subir:" />
        </p>
        <p>
          <RevealText text="Para participar de la experiencia, es necesario que hagas espacio para la imagen que vas a subir:" />
        </p>
        {data ? (
          <>
            <p>
              <RevealText
                animate={Boolean(data?.limit)}
                className="font-faded"
                text={`Acá hay ${data?.limit} imágenes del total (${data?.total})`}
              />
            </p>
            <p>
              <RevealText
                animate={Boolean(data?.choose)}
                className="font-faded"
                text={`Elegí ${
                  data?.choose - form.selected.length
                } de las siguientes imágenes para descartar. Serán procesadas para "hacer lugar" para tus imágenes y no van a poder ser vistas de la misma manera...`}
              />
            </p>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="relative z-0 grid w-full grid-flow-row grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12">
        {data?.resources
          .filter(({ resource_id }) => !form.selected.includes(resource_id))
          .map((resource) => (
            // TODO add wrapper with a hover/focus transition
            <div className="relative" key={resource.resource_id}>
              <button
                aria-label={`Abrir información sobre ${resource.filename}`}
                className="w-full h-full focus:outline-none"
                title={`Abrir información sobre ${resource.filename}`}
                onClick={() => setResource(resource)}
                type="button"
              >
                <Image
                  layout="responsive"
                  height={1}
                  width={1}
                  loader={loader}
                  alt={resource.filename}
                  src={resource.uri}
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
