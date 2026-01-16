import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { categoriesService } from "../../../../../app/services/categoriesService";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

const schema = z.object({
  bankAccountId: z.string().optional(),
  type: z.enum(['EXPENSE', 'INCOME']),
  name: z.string().nonempty('Informe o nome'),
  icon: z.string().nonempty('Informe o ícone'),
});

type formData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
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

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: categoriesService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        icon: data.icon,
        name: data.name,
        type: data.type,
        bankAccountId: data.bankAccountId ?? null,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('Categoria cadastrada com sucesso');
      reset();
      closeNewCategoryModal();
    } catch (error) {
      toast.error('Erro ao cadastrar a categoria');
    }
  });

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    register,
    errors,
    control,
    handleSubmit,
    isLoading: isPending,
    accounts,
  };
}