import {
  m,
  // motion as m,
  AnimatePresence,
  AnimateSharedLayout,
} from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react";

import { FilesWithType } from "../../../lib/hooks/useDndFile";
import range from "../../../lib/utils/range";
import Item from "./item";

type Props = {
  files: FilesWithType[];
  sideItems?: number;
};

export default function Showcase({ files, sideItems = 2 }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const current = wrap(0, files.length, page);

  const prev = Array.from(range(sideItems)).map((index) => {
    const wrappedIndex = wrap(0, files.length, index + current - sideItems);
    return { ...files[wrappedIndex], index: wrappedIndex };
  });

  const next = Array.from(range(sideItems)).map((index) => {
    const wrappedIndex = wrap(0, files.length, current + 1 + index);
    return { ...files[wrappedIndex], index: wrappedIndex };
  });

  const paginate = (newPage: number, newDirection: number) => {
    setPage([newPage, newDirection]);
  };

  return (
    <div className="w-full">
      <AnimateSharedLayout type="switch">
        <AnimatePresence custom={direction} initial={false}>
          <m.div
            className="flex justify-between w-full h-64 overflow-hidden"
            layout="position"
            transition={{
              layoutX: {
                duration: 3,
              },
            }}
          >
            {prev.map(({ file, index }) => (
              <Item
                key={file.name}
                file={file}
                onClick={() => paginate(index, -1)}
              />
            ))}
            <Item key={files[current].file.name} file={files[current].file} />
            {next.map(({ file, index }) => (
              <Item
                key={file.name}
                file={file}
                onClick={() => paginate(index, 1)}
              />
            ))}
          </m.div>
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
}
