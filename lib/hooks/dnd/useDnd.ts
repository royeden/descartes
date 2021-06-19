import { DragEventHandler, useCallback } from "react";

import useDrag, { DragHandler } from "./useDrag";

type DndHook = {
  drag: DragHandler;
  dragging: boolean;
  drop: DragEventHandler;
};

type Options = {
  onDrag?: () => void;
  onDrop?: DragEventHandler;
};

export function useDnd({ onDrag, onDrop }: Options = {}): DndHook {
  const [dragging, drag, setDragging] = useDrag(onDrag);
  const drop = useCallback<DragEventHandler>(
    (event) => {
      event.preventDefault();
      setDragging(false);
      if (onDrop) onDrop(event);
    },
    [onDrop, setDragging]
  );
  return {
    drag,
    dragging,
    drop,
  };
}
