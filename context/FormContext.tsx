import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import useLocalStorage from "~hooks/useLocalStorage";
import useObjectState, { DispatchPartial } from "~hooks/useObjectState";

type FormState = {
  name: string;
  step: number;
  uploaded: number | null; // ID in the DB
  reason: string;
  selected: number[];
};

type FormContextType = {
  form: FormState;
  loading: boolean;
  mergeForm: DispatchPartial<FormState>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const FormContext = createContext<FormContextType>(null!);

const { Provider } = FormContext;

type Props = {
  children: ReactNode;
};

export default function FormProvider({ children }: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [localState, setLocalState] = useLocalStorage<FormState>("form", {
    name: "",
    reason: "",
    selected: [],
    step: 0,
    uploaded: null,
  });

  const [form, mergeForm] = useObjectState<FormState>(localState);

  useEffect(() => {
    if (JSON.stringify(form) !== JSON.stringify(localState))
      setLocalState(form);
  }, [form, localState, setLocalState]);

  return (
    <Provider value={{ form, loading, mergeForm, setLoading }}>
      {children}
    </Provider>
  );
}
