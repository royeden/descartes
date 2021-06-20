import deepMerge from "deepmerge";
import { useState, SetStateAction, Dispatch } from "react";

type SetPartialStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>);
export type DispatchPartial<T> = Dispatch<SetPartialStateAction<T>>;
type ObjectStateHook<T> = [T, DispatchPartial<T>, Dispatch<SetStateAction<T>>];

export default function useObjectState<T extends Record<string, unknown>>(
  initialState: T | (() => T)
): ObjectStateHook<T> {
  const [state, setState] = useState<T>(initialState);

  const mergeState: DispatchPartial<T> = (newState) =>
    setState((prevState) =>
      deepMerge(
        prevState,
        newState instanceof Function ? newState(prevState) : newState,
        {
          arrayMerge: (_, source) => source,
        }
      )
    );

  return [state, mergeState, setState];
}
