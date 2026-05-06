import { useState } from "react";
import * as RdxSelect from "@radix-ui/react-select";
import {
	ChevronDownIcon,
	ChevronUpIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "../../app/utils/cn";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function Select({ className, error, placeholder, options, onChange, value }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value ?? '');

  function handleSelectValue(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 dark:text-gray-400 pointer-events-none',
            selectedValue && 'top-2 text-xs left-[13px] transition-all translate-y-0',
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root value={value} onValueChange={handleSelectValue}>
          <RdxSelect.Trigger
            className={
              cn(
                'bg-white dark:bg-gray-700 rounded-lg border border-gray-500 dark:border-gray-600 px-3 h-[52px] text-gray-800 dark:text-gray-100 w-full focus:border-teal-900 dark:focus:border-teal-400 transition-all outline-none text-left relative pt-4',
                error && '!border-red-900',
                className,
              )
            }
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="overflow-hidden bg-white dark:bg-gray-800 z-[99] rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton
                className="flex h-[25px] cursor-default items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
              >
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>
              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    className={cn(
                      "p-2 text-gray-800 dark:text-gray-100 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 dark:data-[highlighted]:bg-gray-700 rounded-lg transition-colors",
                    )}
                    value={option.value}
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}

              </RdxSelect.Viewport>
              <RdxSelect.ScrollDownButton
                className="flex h-[25px] cursor-default items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
              >
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

    {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}