import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { categoriesService } from "../../../../../app/services/categoriesService";
import type { Category } from "../../../../../app/entities/Category";

const schema = z.object({
  bankAccountId: z.string().optional(),
  name: z.string().nonempty('Informe o nome'),
  icon: z.string().nonempty('Informe o ícone'),
  type: z.enum(['EXPENSE', 'INCOME']),
});

type formData = z.infer<typeof schema>;

export function useEditCategoryModalController(
  category: Category | null,
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
      bankAccountId: category?.bankAccountId ?? undefined,
      name: category?.name,
      icon: category?.icon,
      type: category?.type,
    },
  });

  const { accounts } = useBankAccounts();

  const {
    isPending: isLoading,
    mutateAsync: updateCategory,
  } = useMutation({
    mutationFn: categoriesService.update,
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: deleteTransaction,
  } = useMutation({
    mutationFn: categoriesService.remove,
  });
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      await updateCategory({
        ...data,
        id: category!.id,
        name: data.name,
        icon: data.icon,
        type: data.type,
        bankAccountId: data.bankAccountId ?? null,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('Categoria editada com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao editar a categoria');
    }
  });

  async function handleDeleteCategory() {
    try {
      await deleteTransaction(category!.id);

      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('A categoria foi deletada com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao deletar a categoria!');
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
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteCategory,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}