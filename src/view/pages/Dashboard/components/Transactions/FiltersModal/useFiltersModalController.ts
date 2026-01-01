import { useState } from "react";

import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState === bankAccountId ? undefined : bankAccountId
    ));
  }

  function handleSelectYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleSelectYear,
    accounts,
  };
}