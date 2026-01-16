import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";
import type { Category } from "../../../../../app/entities/Category";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

interface CategoryCardProps {
  data: Category;
  accounts: BankAccount[];
}

export function CategoryCard({ data, accounts }: CategoryCardProps) {
  const { id, name, icon, type, bankAccountId } = data;
  const { openEditCategoryModal } = useDashboard();

  const color = type === 'INCOME' ? '#6366f1' : '#f03e3e';

  return (
    <div
      className="bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{
        borderColor: color,
      }}
      role="button"
      onClick={() => openEditCategoryModal(data)}
      key={id}
    >
      <div>
        <CategoryIcon type={type === 'INCOME' ? 'income' : 'expense'} category={icon} />

        <span className="font-medium text-gray-800 tracking-[-0.5px] mt-4 block">
          { name }
        </span>

        <div>
          <span className='font-medium text-gray-800 tracking-[-0.5px] mt-4 block'>
            {accounts.find(account => account.id === bankAccountId)?.name ?? 'Sem conta selecionada'}
          </span>
        </div>
      </div>
    </div>
  )
}