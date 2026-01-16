import { httpClient } from "../httpClient";

import type { Transaction } from "../../entities/Transaction";

type TransactionsResponse = Array<Transaction>;

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  categoryId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });
  return data;
}
