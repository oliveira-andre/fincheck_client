import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface TransactionTypeDropdownProps {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex items-center gap-2"> 
          {selectedType === 'INCOME' && <IncomeIcon /> }
          {selectedType === 'EXPENSE' && <ExpensesIcon /> }
          {selectedType === undefined && <TransactionsIcon /> }

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'INCOME' && 'Receitas' }
            {selectedType === 'EXPENSE' && 'Despesas' }
            {selectedType === undefined && 'Transações' }
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          <span>Receitas</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          <span>Despesas</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          <span>Transações</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}