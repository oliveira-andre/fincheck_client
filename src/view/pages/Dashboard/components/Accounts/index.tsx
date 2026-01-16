import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.css';

import { cn } from "../../../../../app/utils/cn";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { CategoryCard } from "./CategoryCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
import { EditCategoryModal } from "../../modals/EditCategoryModal";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    categorySliderState,
    setCategorySliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
    categories,
    isLoadingCategories,
  } = useAccountsController();
  const {
    isEditCategoryModalOpen,
    categoryBeingEdited,
    closeEditCategoryModal,
  } = useDashboard();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner
            className="text-teal-950/50 fill-white w-10 h-10"
          />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-sm text-white block">Saldo Total</span>
            <div className="flex items-center gap-2">
              <strong
              className={cn(
                  'text-2xl font-medium tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                type="button"
                className="text-white w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {!isLoadingCategories && categories.length > 0 && (
              <>
                <div> 
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={windowWidth >= 500 ? 3.2 : 1.2}
                    onSlideChange={swiper => {
                      setCategorySliderState({
                        isBeginning: swiper.isBeginning,
                        isEnd: swiper.isEnd,
                      });
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-4" slot="container-start">
                      <strong className="text-lg text-white block tracking-[-1px] font-bold">
                        Categorias
                      </strong>
                      
                      <SliderNavigation
                        isBegin={categorySliderState.isBeginning}
                        isEnd={categorySliderState.isEnd}
                      />
                    </div>

                    {categories.map(category => (
                      <SwiperSlide key={category.id}>
                        <CategoryCard data={category} accounts={accounts} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {categoryBeingEdited && (
                  <EditCategoryModal
                    open={isEditCategoryModalOpen}
                    onClose={closeEditCategoryModal}
                    category={categoryBeingEdited}
                  />
                )}
              </>
            )}

            {accounts.length === 0 && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-lg text-white block tracking-[-1px] font-bold">
                    Minhas Contas
                  </strong>
                </div>

                <button
                  type="button"
                  className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                  onClick={openNewAccountModal}
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div> 
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                  onSlideChange={swiper => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-4" slot="container-start">
                    <strong className="text-lg text-white block tracking-[-1px] font-bold">
                      Minhas Contas
                    </strong>
                    
                    <SliderNavigation
                      isBegin={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map(account => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}