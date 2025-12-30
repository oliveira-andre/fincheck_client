import { Controller } from "react-hook-form";

import { Modal } from "../../../../components/Modal";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Button } from "../../../../components/Button";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleSubmit,
    register,
    control,
    errors,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal
      onClose={handleCloseDeleteModal}
      title="Tem certeza que deseja excluir esta conta?"
      description="Ao excluir a conta, também serão excluídas todos os registros de receita e despesas relacionados."
    />
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
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
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              name="initialBalance"
              control={control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={[
                  {
                    label: 'Conta Corrente',
                    value: 'CHECKING',
                  },
                  {
                    label: 'Investimento',
                    value: 'INVESTMENT',
                  },
                  {
                    label: 'Dinheiro Fisico',
                    value: 'CASH',
                  },
                ]}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
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