import { domMax, LazyMotion } from "framer-motion";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.browser) {
      window.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
        },
        false
      );
      window.addEventListener(
        "drop",
        (event) => {
          event.preventDefault();
        },
        false
      );
    }
  }, []);
  return <LazyMotion features={domMax} strict>
    <Component {...pageProps} />
  </LazyMotion>
  ;
}

export default MyApp;
