import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 hover:bg-teal-800 transition-colors disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium
      text-white disabled:text-gray-400 disabled:cursor-not-allowed"
    />
  )
}