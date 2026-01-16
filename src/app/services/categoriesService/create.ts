import { httpClient } from "../httpClient";

interface CreateCategoryParams {
  bankAccountId: string | null | undefined;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function create(params: CreateCategoryParams) {
  const { data } = await httpClient.post('/categories', params);
  return data;
}
