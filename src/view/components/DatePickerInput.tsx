import { useState } from "react";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { capitalize } from "../../app/utils/capitalize";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  className?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({ className, error, value, onChange }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
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
            <span>{capitalize(formatDate(selectedDate))}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleSelectDate}
          /> 
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}