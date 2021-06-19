import { Fragment } from "react";

const CONTROLS = {
  X: {
    move: "A D",
    rotation: "↑ ↓",
  },
  Y: {
    move: "R F",
    rotation: "← →",
  },
  Z: {
    move: "W S",
    rotation: "Q E",
  },
};

const CONTROLS_AXIS: Array<keyof typeof CONTROLS> = ["X", "Y", "Z"];

export default function FlyControlsInstructions(): JSX.Element {
  return (
    <>
      <p>Controles</p>
      {CONTROLS_AXIS.map((axis) => (
        <Fragment key={axis}>
          <p>
            <span className="font-bold">{CONTROLS[axis].move}</span> (Moverse en
            el eje {axis})
          </p>
          <p>
            <span className="font-bold">{CONTROLS[axis].rotation}</span> (Rotar
            en el eje {axis})
          </p>
        </Fragment>
      ))}
      <p>Clickea una imagen para ver los detalles.</p>
    </>
  );
}
