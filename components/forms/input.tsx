import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputAttrs = InputHTMLAttributes<HTMLInputElement>;

type TextareaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props =
  | InputAttrs
  | ({
      type: "textarea";
    } & TextareaAttrs);

export default function Input({
  className = "",
  type = "text",
  ...props
}: Props): JSX.Element {
  return type === "textarea" ? (
    <textarea className={clsx("", className)} {...(props as TextareaAttrs)} />
  ) : (
    <input
      className={clsx("", className)}
      type={type}
      {...(props as InputAttrs)}
    />
  );
}
