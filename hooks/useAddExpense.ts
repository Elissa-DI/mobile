import { useToast } from "react-native-toast-notifications";
import { useMutation } from "@tanstack/react-query";
import { createExpense } from "@/services/expenseService";
import { ExpenseInput } from "@/types/expense";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export const useAddExpense = () => {
  const toast = useToast();
  const { user } = useAuth(); // get logged-in user

  const mutation = useMutation({
    mutationFn: async (expense: Omit<ExpenseInput, "name" | "userId">) => {
      const payload: ExpenseInput = {
        ...expense,
        name: user?.username || "Unknown User",
        userId: user?.id,
        date: new Date().toISOString().split("T")[0],
      };
      return await createExpense(payload);
    },
    onSuccess: () => {
      toast.show("Expense added successfully!", { type: "success" });
      router.push("/(tabs)");
    },
    onError: () => {
      toast.show("Failed to add expense. Please try again.", { type: "danger" });
    },
  });

  return {
    addExpense: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
