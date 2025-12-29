import { z } from "zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  name: z.string().nonempty('Nome da conta é obrigatório'),
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  color: z.string().nonempty('Cor é obrigatória'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
});

type formData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
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

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta editada com sucesso');
      reset();
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao editar a conta');
    }
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    control,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}