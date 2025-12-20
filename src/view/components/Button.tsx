import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        cn(
          "bg-teal-900 hover:bg-teal-800 transition-colors disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed",
          className,
        )
      }
    />
  )
}