import clsx from "clsx";

import Input from "~components/forms/input";
import RevealText from "~components/ui/RevealText";
import Button from "~components/ui/button";

type Props = {
  loading: boolean;
  onChange: (name: string) => void;
  value: string;
};

export default function Name({ value, onChange, loading }: Props): JSX.Element {
  return (
    <div>
      <label htmlFor="name" className="mb-2 font-bold cursor-pointer">
        <RevealText text="Indicá con qué nombre querés participar de la experiencia:" />
      </label>
      <div className="flex">
        <Input
          className="p-2 my-4 transition duration-300 ease-in-out bg-transparent border-2 border-gray-600 rounded shadow-sm hover:border-purple-800 focus:border-purple-800 focus:outline-none focus:ring-1 ring-purple-400 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed"
          disabled={loading}
          id="name"
          name="name"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Anónimx"
          type="text"
          value={value}
        />
      </div>
      <Button
        className={clsx(
          "self-center w-48 text-white bg-purple-600 disabled:bg-gray-400 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400",
          {
            "animate-pulse": loading,
          }
        )}
        disabled={loading}
        type="submit"
      >
        Continuar
      </Button>
    </div>
  );
}
