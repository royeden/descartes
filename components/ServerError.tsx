import { PropsWithChildren, useContext } from "react";

import RevealText from "./ui/RevealText";

import { ServerStatusContext } from "~context/ServerStatus";
import usePrevious from "~hooks/usePrevious";

type Props = PropsWithChildren<{
  fallback?: boolean;
  message?: string;
}>;

export default function ServerError({
  children,
  fallback = false,
  message = "",
}: Props): JSX.Element {
  // TODO add loading component
  const { error, loading, online } = useContext(ServerStatusContext);
  const loaded = usePrevious<boolean>(loading);
  return (
    <>
      {loading ? (
        <>
          {loaded ? (
            <RevealText text="Conectando con el servidor..." />
          ) : (
            <p>Conectando con el servidor...</p>
          )}
          {fallback && children}
        </>
      ) : error ? (
        <>
          {message && <RevealText text={message} />}
          {fallback && children}
        </>
      ) : online ? (
        children
      ) : fallback ? (
        children
      ) : (
        message && <RevealText text={message} />
      )}
    </>
  );
}
