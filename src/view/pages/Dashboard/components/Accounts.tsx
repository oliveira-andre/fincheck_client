import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css';

import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from "./AccountSliderNavigation";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div className="">
        <span className="tracking-[-0.5px] text-sm text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl font-medium tracking-[-1px] text-white">R$ 10.000,00</strong>

          <button type="button" className="text-white w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div> 
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1} 
          >
            <div className="flex items-center justify-between gap-2 mb-4" slot="container-start">
              <strong className="text-lg text-white block tracking-[-1px] font-bold">
                Minhas Contas
              </strong>
              
              <AccountSliderNavigation />
            </div>

            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={10000.23}
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#1864AB"
                name="XP Investimentos"
                balance={10000.23}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#087F5B"
                name="Banco do Brasil"
                balance={10000.23}
                type="CHECKING"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}