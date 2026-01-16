import { httpClient } from "../httpClient";

interface UpdateCategoryParams {
  id: string;
  bankAccountId: string | null | undefined;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...params }: UpdateCategoryParams) {
  const { data } = await httpClient.put(`/categories/${id}`, params);
  return data;
}
