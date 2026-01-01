import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export function useTransactions() {
  const { data, isFetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }),
  });

  return {
    transactions: data ?? [],
    isFetching,
  };
}