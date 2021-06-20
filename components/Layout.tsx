import clsx from "clsx";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

import SEO, { SEO as SEOTYPE } from "./SEO";

const Nav = dynamic(() => import("./ui/Nav"), { ssr: false });

type Props = {
  className?: string;
  footer?: boolean;
  nav?: boolean;
  seo: SEOTYPE;
};

export function Layout({
  children,
  className = "",
  footer = true,
  nav = true,
  seo,
}: PropsWithChildren<Props>): JSX.Element {
  return (
    <div className="relative flex flex-col min-h-screen">
      <SEO {...seo} />
      {nav && <Nav />}
      <main
        className={clsx(
          {
            "pt-16": nav,
          },
          className
        )}
      >
        {children}
      </main>
      {footer && (
        <footer className="px-4">
          <div className="flex items-center justify-center w-full h-24 pb-2 border-t-2 border-gray-200">
            <p>
              Hecho por{" "}
              <a
                className="transition-colors duration-300 focus:outline-none focus:text-purple-600 hover:text-purple-600"
                href="https://github.com/royeden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Roy Eden</b>
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
