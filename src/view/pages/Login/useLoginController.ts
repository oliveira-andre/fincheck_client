import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}