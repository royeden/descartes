import clsx from "clsx";
import Image from "next/image";
import { Resource } from "pages/api/resources/get-all";
import { LimitedResourcesResponse } from "pages/api/resources/get-limited";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

import DiscardModal from "./DiscardModal";

import RevealText from "~components/ui/RevealText";

const loader = ({ src }: { src: string }): string =>
  `${process.env.NEXT_PUBLIC_STATIC_URL as string}${src}`;

// TODO separate into components, dummy
type Props = {
  loading: boolean;
  onDiscard: (resource: Resource, reason: string) => void;
  selected: number;
  submitStep: () => void;
};

export default function Gallery({
  loading,
  onDiscard,
  selected,
  submitStep,
}: Props): JSX.Element {
  const { data, mutate } = useSWR<LimitedResourcesResponse>(
    "/api/resources/get-limited",
    (url) => fetch(url).then((res) => res.json())
  );
  const [resource, setResource] = useState<Resource | undefined>(undefined);

  const handleDiscard = useCallback(
    async (resource: Resource, reason: string) => {
      try {
        await onDiscard(resource, reason);
        mutate(
          async (limitedResources) =>
            limitedResources && {
              ...limitedResources,
              resources: limitedResources.resources.filter(
                ({ resource_id: id }) => id !== resource.resource_id
              ),
            }
        );
        setResource(undefined);
      } catch (error) {
        console.error(error);
      }
    },
    [mutate, onDiscard]
  );

  useEffect(() => {
    if (data && data?.choose !== undefined && data.choose === selected)
      submitStep();
  }, [data, selected, submitStep]);

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
        "flex-1 w-screen max-w-full max-h-screen pt-16 overflow-x-hidden",
        {
          "overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rose-400":
            !resource,
          "overflow-y-hidden": Boolean(resource),
        }
      )}
    >
      {/* Don't judge me, I'm tired :/ */}
      <DiscardModal
        onDiscard={handleDiscard}
        {...{ handleNext, handlePrev, loading, resource, setResource }}
      />
      <p>
        <RevealText text="Para participar de la experiencia, es necesario que hagas espacio:" />
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
                data?.choose - selected
              } de las siguientes imágenes para eliminar`}
            />
          </p>
        </>
      ) : (
        <p>Cargando...</p>
      )}
      <div className="relative z-0 grid w-full grid-flow-row grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12">
        {data?.resources.map((resource) => (
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
                height={128}
                width={128}
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
