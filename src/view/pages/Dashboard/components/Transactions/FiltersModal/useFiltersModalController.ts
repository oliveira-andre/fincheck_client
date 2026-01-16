import { useState } from "react";

import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  const { categories } = useCategories();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState === bankAccountId ? undefined : bankAccountId
    ));
  }

  function handleSelectYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }

  function handleSelectCategory(categoryId: string) {
    setSelectedCategoryId(prevState => (
      prevState === categoryId ? undefined : categoryId
    ));
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
    accounts,
    categories,
    selectedCategoryId,
    handleSelectCategory,
  };
}