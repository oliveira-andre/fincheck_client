import { z } from "zod";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().nonempty('Nome da conta é obrigatório'),
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  color: z.string().nonempty('Cor é obrigatória'),
  type: z.enum(['CHECKING', 'INVESTIMENT', 'CASH']),
});

type formData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log(data)
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a conta');
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    control,
    handleSubmit,
    errors,
  };
}