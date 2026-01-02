import { useEffect, useState } from "react";

import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionFilters } from "../../../../../app/services/transactionsService/getAll";
import type { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    transactions,
    isFetching: isLoading,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {      
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }
 
  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleApplyFilters({ bankAccountId, year }: { bankAccountId: string | undefined, year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  return {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    isFiltersModalOpen,
    filters,
    isEditModalOpen,
    transactionBeingEdited,
    handleChangeFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}