import { Layout } from "~components/Layout";

const LINKS = [
  {
    link: "https://www.youtube.com/channel/UCEIdyjVgxiXC7qjBheliS2Q",
    social: "Youtube",
  },
  {
    link: "https://proyectointeracciones.bandcamp.com/",
    social: "Bandcamp",
  },
  {
    link: "https://www.facebook.com/oscilacion.planetaria/",
    social: "Facebook",
  },
];

export default function Creditos(): JSX.Element {
  return (
    <Layout
      className="flex flex-col flex-1 w-full min-h-full text-white"
      footer={false}
      seo={{
        description:
          "Créditos de todx aquel que haya contribuído a la creación de este proyecto.",
        title: "Descartes: Créditos",
      }}
    >
      <div className="flex flex-col items-center px-4 py-4 space-y-4 text-left md:px-20 md:space-y-8">
        <h1 className="text-5xl font-bold font-montserrat md:text-6xl">
          Créditos:
        </h1>
        <div className="max-w-full space-y-4 md:space-y-8 font-rubik">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-xl font-bold">
              Sitio web:{" "}
              <a
                className="font-bold underline transition-colors duration-300 ease-in-out text-fuchsia-400 hover:text-fuchsia-300 focus:text-fuchsia-300 focus:outline-none"
                href="https://github.com/royeden/descartes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roy Eden
              </a>
            </h2>
          </div>
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-xl font-bold">
              Audio: Oscilación Planetaria (Gabriel Dellarosa):
            </h2>
            <ul className="space-y-0.5 list-disc list-inside md:space-y-1">
              {LINKS.map(({ link, social }) => (
                <li key={link}>
                  <a
                    className="font-bold underline transition-colors duration-300 ease-in-out text-fuchsia-400 hover:text-fuchsia-300 focus:text-fuchsia-300 focus:outline-none"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
