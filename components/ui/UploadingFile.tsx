import clsx from "clsx";
import { m, Transition } from "framer-motion";

type Props = {
  className?: string;
  size?: number;
  status: "loading" | "done";
};

const transition: Transition = {
  duration: 2,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
};

type RGB = {
  r: number;
  g: number;
  b: number;
};

const normalRGB = (r: number, g: number, b: number): RGB => ({
  b: b / 255,
  g: g / 255,
  r: r / 255,
});

const ashBlue = normalRGB(43, 25, 92);
const green = normalRGB(194, 246, 166);
const deepBlue = normalRGB(1, 29, 93);
const pink = normalRGB(254, 72, 136);

function SVGFilter(): JSX.Element {
  return (
    <filter id="duotone">
      <feColorMatrix
        type="matrix"
        result="grayscale"
        values="1 0 0 0 0
              1 0 0 0 0
              1 0 0 0 0
              0 0 0 1 0"
      />
      <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
        <m.feFuncR
          type="table"
          initial={{ tableValues: `${ashBlue.r} ${green.r}` }}
          animate={{ tableValues: `${deepBlue.r} ${pink.r}` }}
          transition={transition}
        />
        <m.feFuncG
          type="table"
          initial={{ tableValues: `${ashBlue.g} ${green.g}` }}
          animate={{ tableValues: `${deepBlue.g} ${pink.g}` }}
          transition={transition}
        />
        <m.feFuncB
          type="table"
          initial={{ tableValues: `${ashBlue.b} ${green.b}` }}
          animate={{ tableValues: `${deepBlue.b} ${pink.b}` }}
          transition={transition}
        />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
    </filter>
  );
}

export default function UploadingFile({
  className,
  status,
  size = 48,
}: Props): JSX.Element {
  const oldSchool = Math.random() > 50;
  return (
    <div className={clsx("animate-bounce", className)}>
      {status === "loading" && oldSchool && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size + "px"}
          viewBox="0 0 24 24"
          width={size + "px"}
          fill="#ccc"
        >
          <path filter="url(#duotone)" d="M0 0h24v24H0V0z" fill="white" />
          <path
            filter="url(#duotone)"
            d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"
          />
          <SVGFilter />
        </svg>
      )}
      {status === "loading" && !oldSchool && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height={size + "px"}
          viewBox="0 0 24 24"
          width={size + "px"}
          fill="#ccc"
        >
          <g filter="url(#duotone)">
            <rect fill="none" height="24" width="24" />
          </g>
          <g filter="url(#duotone)">
            <g>
              <path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20H6V4h7v5h5V20z M8,15.01 l1.41,1.41L11,14.84V19h2v-4.16l1.59,1.59L16,15.01L12.01,11L8,15.01z" />
            </g>
          </g>
          <SVGFilter />
        </svg>
      )}
      {status === "done" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height={size + "px"}
          viewBox="0 0 24 24"
          width={size + "px"}
          fill="#ccc"
        >
          <g filter="url(#duotone)">
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <g filter="url(#duotone)">
            <path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20H6V4h7v5h5V20z M8.82,13.05 L7.4,14.46L10.94,18l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,13.05z" />
          </g>
          <SVGFilter />
        </svg>
      )}
    </div>
  );
}
