import clsx from "clsx";
import { PropsWithChildren, ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>): JSX.Element {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "px-8 py-3 font-memory font-bold transition duration-300 ease-in-out rounded-full shadow focus:outline-none hover:shadow-md focus:shadow-md",
        className
      )}
    >
      {children}
    </button>
  );
}
