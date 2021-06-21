import { domAnimation, LazyMotion } from "framer-motion";
import { AppProps } from "next/app";
import Image from "next/image";
import { useEffect } from "react";
import ReactModal from "react-modal";

import SoundProvider from "~context/SoundContext";
import "../styles.css";

// Background: https://freestocktextures.com/texture/white-peeling-wall,1413.html
// Edited by me :D
// License https://freestocktextures.com/license/

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
    // TODO remove motion
    <LazyMotion features={domAnimation} strict>
      <div className="fixed z-[-1] overflow-hidden h-screen w-screen bg-black">
        <Image
          alt="Background"
          src="/background.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <SoundProvider>
        <Component {...pageProps} />
      </SoundProvider>
    </LazyMotion>
  );
}

export default MyApp;
