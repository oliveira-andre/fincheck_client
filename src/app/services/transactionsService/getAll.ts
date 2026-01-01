import { httpClient } from "../httpClient";

import type { Transaction } from "../../entities/Transaction";

type TransactionsResponse = Array<Transaction>;

type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });
  return data;
}
