import clsx from "clsx";

import RevealText from "~components/ui/RevealText";
import Button from "~components/ui/button";
import useMobileDetect from "~hooks/useMobileDetect";
import useObjectState from "~hooks/useObjectState";

type Props = {
  onStart: () => void;
};

export default function Intro({ onStart }: Props): JSX.Element {
  const detectMobile = useMobileDetect();

  const [shownText, mergeShownText] = useObjectState({
    disclaimer: false,
    introduction: false,
    title: false,
  });

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold font-faded">
        <RevealText
          text="Descartes: Basura Digital"
          onEnd={() => mergeShownText({ title: true })}
        />
      </h1>

      <div className="w-full px-4 my-4 text-lg text-left md:w-1/2 lg:1/5 md:px-0">
        <p className="mb-8">
          <RevealText
            animate={shownText.title}
            onEnd={() => mergeShownText({ introduction: true })}
            text="Este proyecto apunta a hacer un análisis sobre el descarte de contenidos digitales, en una muestra web interactiva donde todxs somos participantes."
          />
        </p>
        <p className="mb-8">
          <RevealText
            animate={shownText.introduction}
            onEnd={() => mergeShownText({ disclaimer: true })}
            text="Se sugiere para esta experiencia no usar el navegador en incógnito."
          />
        </p>
        {process.browser && detectMobile.isMobile() && (
          <p className="mb-8">
            <RevealText
              animate={shownText.disclaimer}
              text="Se sugiere también acceder desde una computadora en lugar de un dispositivo móvil."
            />
          </p>
        )}
      </div>

      <div
        className={clsx(
          "opacity-0 transition-opacity duration-300 ease-in-out",
          { "opacity-100": shownText.disclaimer }
        )}
      >
        <Button
          className="w-48 text-white bg-purple-600 disabled:bg-gray-400 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400"
          disabled={!shownText.disclaimer}
          onClick={onStart}
          type="button"
        >
          Comenzar
        </Button>
      </div>
    </>
  );
}
