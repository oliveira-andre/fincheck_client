import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { DateLib, DayPicker, type DateLibOptions, type MonthCaptionProps } from "react-day-picker";
import { capitalize } from "../../app/utils/capitalize";
import "react-day-picker/style.css";


interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

function CustomMonthCaption({ calendarMonth }: MonthCaptionProps) {
  return (
    <span className="text-gray-900 tracking-[-0.408px] font-medium">
      {capitalize(format(calendarMonth.date, 'LLLL yyyy'))}
    </span>
  );
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        caption: 'flex items-center justify-between',
        nav: 'flex gap-1',
        nav_button_previous: 'text-teal-800 flex items-center justify-center !bg-transparent',
        nav_button_next: 'text-teal-800 flex items-center justify-center !bg-transparent',
        day_button: 'text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full',
        day_today: 'bg-gray-100 font-bold text-gray-900',
        selected: '!bg-teal-300 rounded-full !text-white font-medium',
      }}
      components={{
        MonthCaption: CustomMonthCaption
      }}
    />
  )
}