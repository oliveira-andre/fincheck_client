import { cn } from "../../../../../app/utils/cn";
import { useSwiper } from "swiper/react";

interface SliderOptionProps {
  month: string;
  isActive: boolean;
  index: number;
}

export function SliderOption({ month, isActive, index }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={
        cn(
          'text-sm text-gray-800 tracking-[-0.5px] font-medium rounded-full h-12 w-full',
          isActive && 'bg-white'
        )
      }
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  )
}