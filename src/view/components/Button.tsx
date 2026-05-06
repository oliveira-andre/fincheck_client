import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button({ className, isLoading, disabled, children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={
        cn(
          "bg-teal-900 hover:bg-teal-800 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-700 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center",
          variant === 'danger' && "bg-red-900 hover:bg-red-800",
          variant === 'ghost' && "bg-transparent hover:bg-gray-800/5 dark:hover:bg-gray-100/10 text-gray-800 dark:text-gray-100 border border-gray-800 dark:border-gray-500",
          className,
        )
      }
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  )
}