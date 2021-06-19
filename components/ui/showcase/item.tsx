import { m, Variants } from "framer-motion";
import { MouseEventHandler } from "react";

type ItemProps = {
  file: File;
  onClick?: MouseEventHandler;
};

const variants: Variants = {
  center: {
    opacity: 1,
  },
  enter: () => ({
    opacity: 0,
  }),
  exit: () => ({
    opacity: 1,
  }),
};

export default function Item({ file, onClick }: ItemProps) {
  return (
    <m.div
      className="flex items-center justify-center flex-1 flex-shrink-0 h-full"
      layoutId={file.name}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      transition={{
        duration: 3,
        opacity: {
          delay: 1.5,
        },
      }}
    >
      {onClick ? (
        <button type="button" onClick={onClick}>
          {file.name}
        </button>
      ) : (
        file.name
      )}
    </m.div>
  );
}
