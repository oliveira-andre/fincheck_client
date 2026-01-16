import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { useFiltersModalController } from "./useFiltersModalController";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { bankAccountId: string | undefined, year: number, categoryId: string | undefined }) => void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
    accounts,
    categories,
    selectedCategoryId,
    handleSelectCategory,
  } = useFiltersModalController();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filtros"
    >
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                selectedBankAccountId === account.id && '!bg-gray-50',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>

        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Categoria
        </span>
        <div className="space-y-2 mt-2 max-h-[200px] overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                selectedCategoryId === category.id && '!bg-gray-50',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">
          Ano
        </span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleSelectYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">{selectedYear}</span>
          </div>

          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleSelectYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() => onApplyFilters({ bankAccountId: selectedBankAccountId, year: selectedYear, categoryId: selectedCategoryId })}
      >
        Aplicar Filtros
      </Button>
    </Modal>
  )
}