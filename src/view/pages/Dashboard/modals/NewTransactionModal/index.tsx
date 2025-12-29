import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";

export function NewTransactionModal() {
  const { 
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div className="flex flex-col gap-4">
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            {isExpense ? 'Valor da Despesa' : 'Valor da Receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Select
            placeholder="Categoria"
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
          />

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber na conta'}
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
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  )
}