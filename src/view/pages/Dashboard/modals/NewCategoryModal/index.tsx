import { Controller } from "react-hook-form";

import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { useNewCategoryModalController } from "./useNewCategoryModalController";
import { Button } from "../../../../components/Button";

export function NewCategoryModal() {
  const { 
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    control,
    errors,
    handleSubmit,
    register,
    isLoading,
    accounts,
  } = useNewCategoryModalController();

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
      title="Nova Categoria"
      open={isNewCategoryModalOpen}
      onClose={closeNewCategoryModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
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
          Criar
        </Button>
      </form>
    </Modal>
  )
}