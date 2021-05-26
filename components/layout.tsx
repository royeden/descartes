import { PropsWithChildren } from "react"
import SEO, { SEO as SEOTYPE } from "./SEO"

type Props = {
  className: string;
  seo: SEOTYPE;
}

export function Layout({ children, className, seo }: PropsWithChildren<Props>) {
  return <div className="relative flex flex-col min-h-screen">
    <SEO {...seo} />
    <main className={className}>{children}</main>
    <footer className="flex items-center justify-center w-full h-24 pb-2 border-t">
        <p>
          Hecho por{" "}
          <a
            className="transition-colors duration-300 focus:outline-none focus:text-indigo-600 hover:text-indigo-600"
            href="https://github.com/royeden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Roy Eden</b>
          </a>
        </p>
      </footer>
  </div>
}