import dynamic from "next/dynamic";
import { useContext } from "react";

import Intro from "~components/Form/Intro";
import { Layout } from "~components/Layout";
import { SoundContext } from "~context/SoundContext";
import useInBrowser from "~hooks/useInBrowser";
import useLocalStorage from "~hooks/useLocalStorage";

const Form = dynamic(() => import("~components/Form"), {
  ssr: false,
});

export default function Home(): JSX.Element {
  const { setPlaying } = useContext(SoundContext);

  const [introduction, setIntroduction] = useLocalStorage(
    "introduction",
    false
  );

  const inBrowser = useInBrowser();

  return (
    <Layout
      className="flex flex-col flex-1 text-center text-white bg-black"
      seo={{
        description: "Galería interactiva colaborativa",
        title: "Descartes: Basura Digital",
      }}
      nav={inBrowser && introduction}
      footer={false}
    >
      {introduction ? (
        <Form />
      ) : (
        <Intro
          onStart={() => {
            setIntroduction(true);
            setPlaying(true);
          }}
        />
      )}
    </Layout>
  );
}
