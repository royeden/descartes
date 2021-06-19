import { ServerStatus } from "pages/api/online";
import { createContext, ReactNode } from "react";
import useSWR from "swr";

type ServerStatusContextType = ServerStatus & {
  error: boolean;
  loading: boolean;
};

export const ServerStatusContext = createContext<ServerStatusContextType>({
  error: false,
  loading: true,
  online: false,
});

const { Provider } = ServerStatusContext;

type Props = {
  children: ReactNode;
};

export default function ServerStatusProvider({ children }: Props): JSX.Element {
  const { data, error } = useSWR<ServerStatus>("/api/online", (url) =>
    fetch(url).then((res) => res.json())
  );
  return (
    <Provider
      value={{
        error: Boolean(error),
        loading: data === undefined && !error,
        online: !error && Boolean(data?.online),
      }}
    >
      {children}
    </Provider>
  );
}
