import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface AccountSliderNavigationProps {
  isBegin: boolean;
  isEnd: boolean;
}

export function AccountSliderNavigation({ isBegin, isEnd }: AccountSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        type="button"
        onClick={() => swiper.slidePrev()}
        disabled={isBegin}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        type="button"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}