import { Resource } from "pages/api/resources/get-all";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ShowcaseContextType = {
  resource: Resource | null;
  setResource: Dispatch<SetStateAction<Resource | null>>;
};

const ShowcaseContext = createContext<ShowcaseContextType>(null!);

const { Provider } = ShowcaseContext;

type Props = {
  children: ReactNode;
};

export default function ShowcaseProvider({ children }: Props): JSX.Element {
  const [resource, setResource] = useState<Resource | null>(null);
  return (
    <Provider
      value={{
        resource,
        setResource,
      }}
    >
      {children}
    </Provider>
  );
}
