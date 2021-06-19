import { domAnimation, LazyMotion } from "framer-motion";
import { AppProps } from "next/app";
import { useEffect } from "react";
import ReactModal from "react-modal";

import "../styles.css";

import SoundProvider from "~context/SoundContext";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if (process.browser) {
      ReactModal.setAppElement("#__next");
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
  return (
    <LazyMotion features={domAnimation} strict>
      <SoundProvider>
        <Component {...pageProps} />
      </SoundProvider>
    </LazyMotion>
  );
}

export default MyApp;
