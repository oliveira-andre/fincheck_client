import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import type { Category } from "../../../../../app/entities/Category";

const schema = z.object({
  bankAccountId: z.string().nonempty('Informe a conta'),
  categoryId: z.string().nonempty('Informe a categoria'),
  name: z.string().nonempty('Informe o nome'),
  value: z.string().nonempty('Informe o valor'),
  date: z.date(),
});

type formData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoriesList.filter(category => category.type === newTransactionType));
  }, [categoriesList, newTransactionType]);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success(
        newTransactionType === 'EXPENSE' ? 'Despesa cadastrada com sucesso' : 'Receita cadastrada com sucesso',
      );
      reset();
      closeNewTransactionModal();
    } catch (error) {
      toast.error(
        newTransactionType === 'EXPENSE' ? 'Erro ao cadastrar a despesa' : 'Erro ao cadastrar a receita',
      );
    }
  });

  function filterCategoriesByBankAccountId(bankAccountId: string) {
    const categories = categoriesList.filter(category => category.type === newTransactionType && category.bankAccountId === bankAccountId);
    if (categories.length > 0) {
      setCategories(categories);
    }
  }

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
    filterCategoriesByBankAccountId,
  };
}