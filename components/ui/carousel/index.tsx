import { m, Variants, useMotionValue, useTransform } from "framer-motion";
import { wrap } from "popmotion";
import { KeyboardEventHandler, useState } from "react";

import { FilesWithType } from "../../../lib/hooks/_useDndFile";
import Button from "../button";

import Item from "./item";

const variants: Variants = {
  center: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    zIndex: 1,
  },
  enter: (direction: number) => {
    return {
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      x: direction > 0 ? window.innerWidth / 2 : -window.innerWidth / 2,
    };
  },
  exit: (direction: number) => {
    return {
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      x: direction < 0 ? window.innerWidth / 2 : -window.innerWidth / 2,
      zIndex: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number): number => {
  return Math.abs(offset) * velocity;
};

type Props = {
  files: FilesWithType[];
  onDelete?: (index: number) => void;
};

export default function Carousel({ files, onDelete }: Props): JSX.Element {
  const [[page, direction], setPage] = useState([0, 0]);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-300, 0, 300], [-45, 0, 45]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const current = wrap(0, files.length, page);

  const paginate = (newDirection: number): void => {
    setPage([page + newDirection, -newDirection]);
  };

  const keyPress: KeyboardEventHandler = (event) =>
    ["ArrowRight", "ArrowLeft"].includes(event.key) &&
    paginate(event.key === "ArrowRight" ? 1 : -1);

  return (
    <m.div
      onKeyDownCapture={files.length > 1 ? keyPress : undefined}
      className="relative w-full max-w-full my-4 overflow-hidden h-80 md:max-w-2xl px-14 pt-14"
      layout
    >
      {files.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center justify-center h-full ">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 text-2xl text-white transition duration-300 ease-in-out bg-purple-600 rounded-full shadow hover:shadow-md focus:shadow-md hover:bg-purple-500 focus:bg-purple-500 focus:outline-none"
              onClick={() => paginate(-1)}
            >
              {"<"}
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-center h-full ">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 text-2xl text-white transition duration-300 ease-in-out bg-purple-600 rounded-full shadow hover:shadow-md focus:shadow-md hover:bg-purple-500 focus:bg-purple-500 focus:outline-none"
              onClick={() => paginate(1)}
            >
              {">"}
            </button>
          </div>
        </>
      )}
      {onDelete && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center w-full">
          <Button
            className="text-white bg-red-500 disabled:bg-gray-400 focus:bg-red-400 hover:bg-red-400"
            onClick={() => onDelete(current)}
            type="button"
          >
            No quiero subir este archivo
          </Button>
        </div>
      )}
      <m.div
        key={page}
        className="flex flex-col items-center justify-center w-full h-full py-2 cursor-pointer"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.2 },
          x: { damping: 40, stiffness: 300, type: "spring" },
        }}
        style={{ rotateY, x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={
          files.length > 1
            ? (e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(-1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(1);
                }
              }
            : undefined
        }
      >
        <Item file={files[current]} />
        <p className="flex-shrink-0">
          {current + 1}/{files.length}
        </p>
      </m.div>
    </m.div>
  );
}
