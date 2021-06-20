import { useContext } from "react";

import Explorer from "./Explorer";
import Gallery from "./Gallery";
import Name from "./Name";
import Upload from "./Upload";

import { FormContext } from "~context/FormContext";

export default function Container(): JSX.Element {
  const { form } = useContext(FormContext);

  return (
    <>
      {form.uploaded ? (
        <Explorer />
      ) : (
        <div className="flex flex-col items-center w-full h-full pt-4">
          {form.step === 0 && <Name />}
          {form.step === 1 && <Gallery />}
          {form.step === 2 && <Upload />}
        </div>
      )}
    </>
  );
}
