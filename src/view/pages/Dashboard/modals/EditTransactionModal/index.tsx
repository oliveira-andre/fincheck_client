import { Controller } from "react-hook-form";

import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import type { Transaction } from "../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  const { 
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    isLoadingDelete,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal
      onClose={handleCloseDeleteModal}
      title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
      onConfirm={handleDeleteTransaction}
      isLoading={isLoadingDelete}
    />
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={
        <button
          type="button"
          onClick={handleOpenDeleteModal}
        >
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            {isExpense ? 'Valor da Despesa' : 'Valor da Receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
             <Controller
              name="value"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                placeholder="Categoria"
                options={categories.map(category => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
              )}
            />

          <Controller
            name="bankAccountId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber na conta'}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                options={
                  accounts.map(account => ({
                    label: account.name,
                    value: account.id,
                  }))
                }
              />
            )}
            />

          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}