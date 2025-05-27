import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import { Expense } from "@/services/expenseService";

interface Props {
  expense: Expense;
}

const ExpenseCard: React.FC<Props> = ({ expense }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-200"
      onPress={() =>
        router.push({
          pathname: "/(modals)/expenses/[id]",
          params: { id: expense.id },
        })
      }
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          <View className="bg-sky-100 p-2 rounded-full">
            <Ionicons name="card-outline" size={24} color="#0EA5E9" />
          </View>
          <View>
            <Text className="text-base font-medium">{expense.name}</Text>
            <Text className="text-sm text-gray-500">
              {dayjs(expense.createdAt).format("MMM D, YYYY")}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-2">
          <Text className="text-lg font-semibold text-sky-500">
            ${expense.amount}
          </Text>
          <View>
            <Ionicons name="chevron-forward" size={20} color="#0EA5E9"/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseCard;
