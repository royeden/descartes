import { useContext } from "react";

import Input from "~components/forms/input";
import RevealText from "~components/ui/RevealText";
import Button from "~components/ui/button";
import { FormContext } from "~context/FormContext";

export default function Name(): JSX.Element {
  const { form, mergeForm } = useContext(FormContext);

  return (
    <form
      className="flex flex-col items-center w-full max-w-lg px-4 space-y-4 text-sm text-left md:text-base md:space-y-8 font-rubik"
      onSubmit={() => mergeForm(({ step }) => ({ step: step + 1 }))}
    >
      <label htmlFor="name" className="font-bold cursor-pointer">
        {/* TODO replace with spring */}
        <RevealText
          className="text-left"
          text="Indicá con qué nombre querés participar de la experiencia:"
        />
      </label>
      <div className="flex">
        <Input
          className="p-2 transition duration-300 ease-in-out bg-transparent bg-black border-2 border-gray-600 rounded shadow-sm hover:border-purple-800 focus:border-purple-800 focus:outline-none focus:ring-1 ring-purple-400 disabled:bg-gray-100 disabled:text-gray-900 disabled:cursor-not-allowed font-rubik"
          id="name"
          name="name"
          onChange={(event) => mergeForm({ name: event.target.value })}
          placeholder="Anónimx"
          type="text"
          value={form.name}
        />
      </div>

      <p>
        Este nombre va a estar atado a todo lo que hagas y lo van a poder ver
        todxs lxs demás que estén participando al mismo tiempo.
      </p>
      <p>
        Podes dejarlo vacío y simplemente ser una persona anónima durante tu
        estadía virtual.
      </p>

      <Button
        className="w-48 text-white bg-purple-600 disabled:bg-gray-400 focus:bg-purple-500 hover:bg-purple-500 active:bg-purple-400"
        type="submit"
      >
        Continuar
      </Button>
    </form>
  );
}
