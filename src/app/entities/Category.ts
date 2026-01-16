export interface Category {
  id: string;
  bankAccountId: string | null | undefined;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}