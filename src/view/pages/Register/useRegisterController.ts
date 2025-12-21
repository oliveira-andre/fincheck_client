import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { authService } from "../../../app/services/authService";
import { type SignUpParams } from "../../../app/services/authService/signUp";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

type formData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignUpParams) => {
      return authService.signUp(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken} = await mutateAsync(data);
      toast.success('Conta criada com sucesso');
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a conta');
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}