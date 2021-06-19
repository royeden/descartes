import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import useSWR from "swr";

import type { Resource, ResourcesResponse } from "./api/resources/get-all";

import fetcher from "~api/fetcher";
import { Layout } from "~components/Layout";
import ServerError from "~components/ServerError";
import Skeleton from "~components/Viewer/Skeleton";
import ServerStatusProvider from "~context/ServerStatus";

const Viewer = dynamic(() => import("~components/Viewer"), {
  loading: Skeleton,
  ssr: false,
});

export default function Ver({
  resources = [],
}: ResourcesResponse): JSX.Element {
  // TODO move this to a component down in the tree to consume server status as well
  const { data, error } = useSWR<{ resources: Resource[] }>(
    "/api/resources/get-all",
    (url) => fetch(url).then((res) => res.json()),
    { initialData: { resources }, refreshInterval: 60000 }
  );

  return (
    <ServerStatusProvider>
      <Layout
        className="flex flex-col flex-1 w-full min-h-full text-white bg-black"
        footer={false}
        seo={{
          description: "Donde explorar la basura digital que se va quemando",
          title: "Ver basura arder",
        }}
      >
        <ServerError message="Hubo un error conectando con el servidor, por favor intentá nuevamente más tarde...">
          {resources && (
            <Viewer
              resources={!error && data?.resources ? data.resources : resources}
            />
          )}
        </ServerError>
      </Layout>
    </ServerStatusProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === "production") fetcher("/map/create");
  const resources = await fetcher("/resource/all");
  return {
    props: {
      resources,
      revalidate: 86400000,
    },
  };
};
