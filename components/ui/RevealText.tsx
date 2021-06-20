// https://brad-carter.medium.com/how-to-animate-a-text-reveal-effect-in-react-with-framer-motion-ae8ddd296f0d
import { m, Variants } from "framer-motion";

const staggerValues = Array(10)
  .fill(10)
  .map((value) => (value * Math.random()) / 100);

const sentenceVariants: Variants = {
  hidden: { opacity: 1 },
  visible: () => ({
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren:
        staggerValues[Math.floor(Math.random() * staggerValues.length)],
    },
  }),
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

type Props = {
  animate?: boolean;
  className?: string;
  text: string;
  onEnd?: () => void;
};

export default function RevealText({
  animate = true,
  className = "",
  onEnd,
  text,
}: Props): JSX.Element {
  return (
    <m.span
      className={className}
      variants={sentenceVariants}
      initial="hidden"
      animate={animate && "visible"}
      onAnimationComplete={onEnd}
    >
      {text.split("").map((letter, i) => (
        <m.span key={`${text}-${i}`} variants={letterVariants}>
          {letter}
        </m.span>
      ))}
    </m.span>
  );
}
