import {
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useCallback,
  useState,
} from "react";

export type DragHandler = (enter: boolean) => DragEventHandler;

type DragHook = [boolean, DragHandler, Dispatch<SetStateAction<boolean>>];

export default function useDrag(onDrag?: DragEventHandler): DragHook {
  const [dragging, setDragging] = useState(false);
  const handler = useCallback<DragHandler>(
    (enter) => (event) => {
      event.preventDefault();
      setDragging(enter);
      if (onDrag) onDrag(event);
    },
    [onDrag]
  );
  return [dragging, handler, setDragging];
}
