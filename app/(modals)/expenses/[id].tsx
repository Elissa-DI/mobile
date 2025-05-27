import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/customHeader";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getExpenseById } from "@/services/expenseService";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useDeleteExpense } from "@/hooks/useDeleteExpense";

const ExpenseDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const deleteMutation = useDeleteExpense();

  const { data: expense, isLoading } = useQuery(["expense", id], () =>
    getExpenseById(id as string)
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!expense) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Expense not found.</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    setModalVisible(false);
    deleteMutation.mutate(id as string);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader title="Expense Details" hideIcons={false} />
      <ScrollView className="p-4">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=1" }}
          className="w-full h-60 rounded-lg mb-4"
        />

        <View className="mb-4">
          <Text className="text-xl font-bold">{expense.name}</Text>
          <Text className="text-gray-500">
            {dayjs(expense.createdAt).format("MMMM D, YYYY")}
          </Text>
        </View>

        <View className="space-y-2 mb-6">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="cash-outline" size={20} color="#10B981" />
            <Text className="text-lg font-semibold">Amount:</Text>
          </View>
          <Text className="text-green-600 text-xl font-bold">${expense.amount}</Text>

          <View className="flex-row items-center space-x-2 mt-4">
            <Ionicons name="pricetag-outline" size={20} color="#6B7280" />
            <Text className="text-lg font-semibold">Category:</Text>
          </View>
          <Text className="text-base">{expense.category}</Text>

          {expense.description && (
            <>
              <View className="flex-row items-center space-x-2 mt-4">
                <Ionicons name="document-text-outline" size={20} color="#6B7280" />
                <Text className="text-lg font-semibold">Description:</Text>
              </View>
              <Text className="text-base">{expense.description}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-red-600 rounded-lg py-3 items-center"
          disabled={deleteMutation.isLoading}
        >
          <Text className="text-white font-semibold text-lg">
            {deleteMutation.isLoading ? "Deleting..." : "Delete Expense"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirm Delete Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
          <View className="bg-white rounded-lg p-6 w-full max-w-md">
            <Text className="text-lg font-semibold mb-4">
              Confirm Delete
            </Text>
            <Text className="mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </Text>

            <View className="flex-row justify-end space-x-4">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="py-2 px-4 rounded-lg bg-gray-200"
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                className="py-2 px-4 rounded-lg bg-red-600"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ExpenseDetailsPage;
