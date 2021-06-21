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
    common: false,
    disclaimer: false,
    introduction: false,
    title: false,
  });

  return (
    <div className="flex flex-col items-center px-4 py-4 space-y-2 md:space-y-8 md:py-20 md:px-20 scrollbar-thin scrollbar-thumb-rose-400">
      <h1 className="text-5xl font-bold font-montserrat md:text-6xl">
        <RevealText
          text="Descartes: Basura Digital"
          onEnd={() => mergeShownText({ title: true })}
        />
      </h1>
      <div className="w-full px-4 my-2 space-y-4 text-base text-left font-rubik md:my-4 md:text-lg md:space-y-8 md:w-1/2 lg:1/5 md:px-0">
        <p>
          <RevealText
            animate={shownText.title}
            onEnd={() => mergeShownText({ introduction: true })}
            text="Este proyecto apunta a hacer un análisis sobre el descarte y la transacción de contenidos digitales, en una galería web interactiva donde todxs somos participantes."
          />
        </p>
        <p>
          <RevealText
            animate={shownText.introduction}
            onEnd={() => mergeShownText({ common: true })}
            text="Las imágenes que se muestran en la galería son aportes de cada participante sumado a un aporte inicial por lx autorx."
          />
        </p>
        <p>
          <RevealText
            animate={shownText.common}
            onEnd={() => mergeShownText({ disclaimer: true })}
            text="Se sugiere para esta experiencia no usar el navegador en incógnito."
          />
        </p>
        {process.browser && detectMobile.isMobile() && (
          <p>
            <RevealText
              animate={shownText.disclaimer}
              text="Se sugiere también acceder desde una computadora en lugar de un dispositivo móvil."
            />
          </p>
        )}
      </div>

      <div
        className={clsx(
          "opacity-0 transition-opacity duration-300 ease-in-out font-rubik",
          { "opacity-100": shownText.disclaimer }
        )}
      >
        <Button
          className="w-48 text-white bg-purple-600 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400"
          disabled={!shownText.disclaimer}
          onClick={onStart}
          type="button"
        >
          Comenzar
        </Button>
      </div>
    </div>
  );
}
