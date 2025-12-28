import { useState } from "react";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";

interface DatePickerInputProps {
  className?: string;
  error?: string;
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
  }

  return (
    <div>
      <button
        type="button"
        className={
          cn(
            'bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 w-full focus:border-teal-900 transition-all outline-none text-left relative pt-4',
            error && '!border-red-900',
            className,
          )
        }
        >
            <span className="text-gray-700 text-xs absolute left-[13px] top-2 pointer-events-none">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}