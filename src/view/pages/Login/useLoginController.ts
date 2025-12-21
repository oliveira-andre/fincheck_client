import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { authService } from "../../../app/services/authService";
import { type SignInParams } from "../../../app/services/authService/signIn";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

type formData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });


  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInParams) => {
      return authService.signIn(data);
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      toast.success('Login realizado com sucesso');
      signIn(accessToken);
    } catch (error) {
      toast.error('Credenciais inválidas');
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}