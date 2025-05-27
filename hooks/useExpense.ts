import { useQuery } from "@tanstack/react-query";
import { getExpenseById } from "@/services/expenseService";

export const useExpense = (id: string) => {
  return useQuery(["expense", id], () => getExpenseById(id));
};
