import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/customHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useExpenses } from "@/hooks/useExpenses";
import ExpenseCard from "@/components/expense/expenseCard";
import StatCard from "@/components/home/statCard";
import { useExpenseStats } from "@/hooks/useExpenseStats";
import { Ionicons } from "@expo/vector-icons";

const HomePage = () => {
  const { user } = useAuth();
  const { data: expenses, isLoading } = useExpenses(user?.id);

  const [searchTerm, setSearchTerm] = useState("");

  const stats = useExpenseStats(expenses);

  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];

    const lowerSearchTerm = searchTerm.toLowerCase();

    return expenses.filter(
      (expense) =>
        (expense.category?.toLowerCase() ?? "").includes(lowerSearchTerm) ||
        (expense.description?.toLowerCase() ?? "").includes(lowerSearchTerm)
    );
  }, [searchTerm, expenses]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader title={`Welcome, ${user?.username || "User"}`} />

      <View className="p-4">
        <View className="mb-4 w-full h-24">
          <StatCard label="Total Spent" value={stats.totalMoney} />
        </View>

        <View className="flex-row w-full mb-4">
          <View className="mr-2 w-1/3">
            <StatCard label="Total Expenses" value={stats.totalExpenses} />
          </View>
          <View className="mr-2 w-1/3">
            <StatCard label="Weekly Spent" value={stats.weeklyMoney} />
          </View>
          <StatCard label="Monthly Spent" value={stats.monthlyMoney} />
        </View>

        <TextInput
          placeholder="Search by category or description"
          value={searchTerm}
          onChangeText={setSearchTerm}
          className="border rounded-full px-3 py-2 mb-4"
        />

        <Text className="text-lg font-semibold mb-4">Recent Expenses</Text>

        {isLoading ? (
          <View className="flex h-[80%] items-center justify-center">
            <ActivityIndicator size="large" color="#0ea5e9" />
          </View>
        ) : filteredExpenses.length === 0 ? (
          <View className="flex h-[50%] justify-center items-center p-5">
            <Ionicons
              name="wallet-outline"
              size={80}
              color="#0ea5e9"
              className="mb-4"
            />
            <Text className="text-lg text-gray-500 text-center">
              No expenses found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredExpenses.slice(0, 10)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseCard expense={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
