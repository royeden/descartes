import { GetStaticProps } from "next";
import useSWR from "swr";

import { ResourcesResponse } from "./api/resources/get-all";

import fetcher from "~api/fetcher";
import { Layout } from "~components/Layout";
import ServerError from "~components/ServerError";
import ServerStatusProvider from "~context/ServerStatus";

type Props = ResourcesResponse & {
  commits: number;
};

export default function Estadisticas({
  commits,
  resources,
}: Props): JSX.Element {
  const { data, error } = useSWR<ResourcesResponse>(
    "/api/resources/get-all",
    (url) => fetch(url).then((res) => res.json()),
    { initialData: { resources }, refreshInterval: 60000 }
  );

  return (
    <ServerStatusProvider>
      <Layout
        className="flex flex-col flex-1 w-full min-h-full text-white bg-black bg-opacity-10"
        footer={false}
        seo={{
          description: "Donde explorar la basura digital que se va quemando.",
          title: "Descartes: Estadísticas del proyecto",
        }}
      >
        <ServerError message="Hubo un error conectando con el servidor, vamos a mostrar una copia de la última información disponible...">
          {data && !error ? (
            <div className="flex flex-col items-center px-4 py-4 space-y-4 text-left md:px-20 md:space-y-8">
              <h1 className="text-5xl font-bold font-montserrat md:text-6xl">
                Estadísticas del proyecto:
              </h1>
              <div className="max-w-full space-y-4 md:space-y-8 font-rubik">
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-xl font-bold">Imágenes:</h2>
                  <ul className="space-y-0.5 list-disc list-inside md:space-y-1">
                    <li>
                      Cantidad de imágenes subidas:{" "}
                      <span className="font-bold text-fuchsia-400">
                        {data.resources.length}
                      </span>
                      .
                    </li>
                    <li>
                      Total de píxeles actual (los píxeles que ocuparían todas
                      las imágenes actuales desplegadas en una grilla):{" "}
                      <span className="font-bold text-fuchsia-400">
                        {data.resources.reduce(
                          (acc, { size }) => acc + size ** 2,
                          0
                        )}
                      </span>
                      .
                    </li>
                    <li>
                      Total absoluto de píxeles (los píxeles que ocuparían las
                      imágenes originales desplegadas en una grilla):{" "}
                      <span className="font-bold text-fuchsia-400">
                        {data.resources.reduce(
                          (acc, { original_size }) => acc + original_size,
                          0
                        )}
                      </span>
                      .
                    </li>
                    <li>
                      Total de personas que hicieron aportes (los aportes
                      anónimos se cuentan como uno sólo):{" "}
                      <span className="font-bold text-fuchsia-400">
                        {
                          new Set(...data.resources.map(({ name }) => name))
                            .size
                        }
                      </span>
                      .
                    </li>
                  </ul>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-xl font-bold">Trabajo:</h2>
                  <ul className="space-y-0.5 list-disc list-inside md:space-y-1">
                    <li>
                      Primer implementación de API de descartes (donde todavía
                      se pueden hacer aportes de imágenes de archivo a una
                      carpeta de Google drive):{" "}
                      <span className="font-bold text-fuchsia-400">38</span>.
                    </li>
                    <li>
                      Cantidad de commits (cuantas veces fue iterado el código):{" "}
                      <span className="font-bold text-fuchsia-400">
                        {commits}
                      </span>
                      .
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            "Error"
          )}
        </ServerError>
      </Layout>
    </ServerStatusProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const resources = await fetcher("/resource/all");
  const commits = (
    (await (
      await fetch("https://api.github.com/repos/royeden/descartes/commits")
    ).json()) as Array<unknown>
  ).length;
  return {
    props: {
      commits,
      resources,
      revalidate: 10800000,
    },
  };
};
