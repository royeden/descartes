// https://brad-carter.medium.com/how-to-animate-a-text-reveal-effect-in-react-with-framer-motion-ae8ddd296f0d
import { m, Variants } from "framer-motion";

const staggerValues = Array(10)
  .fill(10)
  .map((value) => (value * Math.random()) / 40);

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
  className?: string;
  text: string;
};

export default function RevealText({ className = "", text }: Props) {
  return (
    <m.p
      className={className}
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((letter, i) => (
        <m.span key={`${text}-${i}`} variants={letterVariants}>
          {letter}
        </m.span>
      ))}
    </m.p>
  );
}
