import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";

export function Fab() {
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="text-white bg-teal-900 rounded-full w-12 h-12 flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            <span>Nova Despesa</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            <span>Nova Receita</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <BankAccountIcon />
            <span>Nova Conta</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}