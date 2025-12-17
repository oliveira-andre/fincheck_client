import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, id, placeholder, ...props }, ref) => {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        id={inputId}
        name={name}
        className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 focus:border-teal-900 transition-all outline-none"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all"
      >
        {placeholder}
      </label>
    </div>
  )
}
);