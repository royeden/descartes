import Container from "./Container";

import ServerError from "~components/ServerError";
import FormProvider from "~context/FormContext";
import ServerStatusProvider from "~context/ServerStatus";

export default function Form(): JSX.Element {
  return (
    <ServerStatusProvider>
      <ServerError message="Hubo un error conectando con el servidor, por favor intentá nuevamente más tarde...">
        <FormProvider>
          <Container />
        </FormProvider>
      </ServerError>
    </ServerStatusProvider>
  );
}
