import { GetStaticProps } from "next";
import useSWR from "swr";

import { ResourcesResponse } from "./api/resources/get-all";

import fetcher from "~api/fetcher";
import { Layout } from "~components/Layout";
import ServerError from "~components/ServerError";
import ServerStatusProvider from "~context/ServerStatus";

export default function Estadisticas({
  resources,
}: ResourcesResponse): JSX.Element {
  const { data, error } = useSWR<ResourcesResponse>(
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
        <ServerError message="Hubo un error conectando con el servidor, vamos a mostrar una copia de la última información disponible...">
          {data && !error ? "Connected" : "Error"}
        </ServerError>
      </Layout>
    </ServerStatusProvider>
  );
}

// TODO fetch images
export const getStaticProps: GetStaticProps = async () => {
  const resources = await fetcher("/resource/all");
  return {
    props: {
      resources,
      revalidate: 86400000,
    },
  };
};
