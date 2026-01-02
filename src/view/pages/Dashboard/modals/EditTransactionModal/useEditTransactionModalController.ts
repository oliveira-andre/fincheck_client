import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
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

  const handleSubmit = hookFormHandleSubmit(async data => {
    console.log(data)
    // try {
    //   await mutateAsync({
    //     ...data,
    //     value: currencyStringToNumber(data.value),
    //     type: newTransactionType!,
    //     date: data.date.toISOString(),
    //   });

    //   queryClient.invalidateQueries({ queryKey: ['transactions'] });
    //   toast.success(
    //     newTransactionType === 'EXPENSE' ? 'Despesa cadastrada com sucesso' : 'Receita cadastrada com sucesso',
    //   );
    //   reset();
    //   closeNewTransactionModal();
    // } catch (error) {
    //   toast.error(
    //     newTransactionType === 'EXPENSE' ? 'Erro ao cadastrar a despesa' : 'Erro ao cadastrar a receita',
    //   );
    // }
  });

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: false,
  };
}