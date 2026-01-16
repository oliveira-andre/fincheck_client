import { Controller } from "react-hook-form";

import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { useEditCategoryModalController } from "./useEditCategoryModalController";
import { Button } from "../../../../components/Button";
import type { Category } from "../../../../../app/entities/Category";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

export function EditCategoryModal({ category, open, onClose }: EditCategoryModalProps) {
  const { 
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    isLoading,
    isDeleteModalOpen,
    handleDeleteCategory,
    handleCloseDeleteModal,
    isLoadingDelete,
    handleOpenDeleteModal,
  } = useEditCategoryModalController(category, onClose);

  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal
      onClose={handleCloseDeleteModal}
      title='Tem certeza que deseja excluir esta categoria?'
      onConfirm={handleDeleteCategory}
      isLoading={isLoadingDelete}
    />
  }

  const categoryTypes = [
    {
      value: 'EXPENSE',
      label: 'Despesa',
    },
    {
      value: 'INCOME',
      label: 'Receita',
    },
  ]

  return (
    <Modal
      title='Editar Categoria'
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
          <div className="hidden">
            <Input
              type="text"
              placeholder="icon"
              defaultValue="other"
              error={errors.icon?.message}
              {...register("icon")}
            />
          </div>

          <Input
            type="text"
            placeholder="Nome da Categoria"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                placeholder="Tipo de Categoria"
                options={categoryTypes.map(categoryType => ({
                  label: categoryType.label,
                  value: categoryType.value,
                }))}
              />
              )}
          />

          <Controller
            name="bankAccountId"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Selecione a conta"
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value ?? undefined}
                options={
                  accounts.map(account => ({
                    label: account.name,
                    value: account.id,
                  }))
                }
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