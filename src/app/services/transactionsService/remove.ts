import { httpClient } from "../httpClient";

export async function remove(id: string) {
  const { data } = await httpClient.delete(`/transactions/${id}`);
  return data;
}
