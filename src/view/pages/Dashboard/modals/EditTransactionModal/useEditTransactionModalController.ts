import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import type { Transaction } from "../../../../../app/entities/Transaction";

const schema = z.object({
  bankAccountId: z.string().nonempty('Informe a conta'),
  categoryId: z.string().nonempty('Informe a categoria'),
  name: z.string().nonempty('Informe o nome'),
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number(),
  ]),
  date: z.date(),
});

type formData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value.toString(),
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  const {
    isPending: isLoading,
    mutateAsync: updateTransaction,
  } = useMutation({
    mutationFn: transactionsService.update,
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: deleteTransaction,
  } = useMutation({
    mutationFn: transactionsService.remove,
  });
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success(
        transaction!.type === 'EXPENSE' ? 'Despesa editada com sucesso' : 'Receita editada com sucesso',
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === 'EXPENSE' ? 'Erro ao editar a despesa' : 'Erro ao editar a receita',
      );
    }
  });

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success(`A ${transaction!.type === 'EXPENSE' ? 'despesa' : 'receita'} foi deletada com sucesso`);
      onClose();
    } catch (error) {
      toast.error(`Erro ao deletar a ${transaction!.type === 'EXPENSE' ? 'despesa' : 'receita'}!`);
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}