/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import PlaySound from "./PlaySound";

type Props = {
  className?: string;
};

const LINKS = [
  {
    label: "Galería",
    url: "/",
  },
  {
    label: "Estadísticas",
    url: "/estadisticas",
  },
  {
    label: "Créditos",
    url: "/creditos",
  },
  // {
  //   label: "Comunicado",
  //   url: "/comunicado",
  // },
  {
    label: "Investigación",
    url: "/investigacion",
  },
];

export default function Nav({ className = "" }: Props): JSX.Element {
  const router = useRouter();

  return (
    <nav
      className={clsx(
        "fixed h-16 w-full z-30 flex bg-gray-800 text-white font-bold shadow-2xl",
        className
      )}
    >
      <PlaySound />
      <div
        className="flex"
        //  className="hidden md:flex"
      >
        {LINKS.map(({ label, url }) => (
          <Link href={url} key={label}>
            <a
              className={clsx(
                "flex items-center justify-center px-4 py-2 text-white transition-colors duration-300 ease-in-out bg-transparent hover:bg-opacity-75 hover:bg-purple-600 focus:bg-purple-600 focus:bg-opacity-75 focus:outline-none active:bg-opacity-100 active:bg-purple-500",
                {
                  underline: url === router.route,
                }
              )}
            >
              {label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
