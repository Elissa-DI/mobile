import { useQuery } from "@tanstack/react-query";
import { getAllExpenses } from "@/services/expenseService";

export const useExpenses = (userId: string | number | undefined) => {
  return useQuery(
    ["expenses", userId],
    () => getAllExpenses(userId!),
    {
      enabled: !!userId, // only fetch if userId exists
    }
  );
};
