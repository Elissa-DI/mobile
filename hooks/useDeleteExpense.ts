import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "@/services/expenseService";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.show("Expense deleted successfully", { type: "success" });
      router.replace("/(tabs)");
    },
    onError: () => {
      toast.show("Failed to delete expense", { type: "danger" });
    },
  });
};
