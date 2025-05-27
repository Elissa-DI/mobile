import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
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
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0EA5E9" />
      </SafeAreaView>
    );
  }

  if (!expense) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
        <Ionicons
          name="alert-circle-outline"
          size={80}
          color="#ef4444"
          className="mb-4"
        />
        <Text className="text-xl font-semibold text-red-600">
          Expense not found.
        </Text>
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
        {/* User/Image Card */}
        <View className="rounded-xl bg-blue-50 shadow-md mb-6 overflow-hidden">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="text-2xl font-bold text-blue-900">
              {expense.name}
            </Text>
            <Text className="text-gray-500 mt-1">
              {dayjs(expense.createdAt).format("MMMM D, YYYY")}
            </Text>
          </View>
        </View>

        {/* Details Cards */}
        <View className="space-y-4">
          {/* Amount */}
          <View className="flex-row items-center space-x-4 bg-green-50 rounded-xl p-4 shadow-sm">
            <Ionicons name="cash-outline" size={36} color="#22c55e" />
            <View>
              <Text className="text-lg font-semibold text-green-700">
                Amount
              </Text>
              <Text className="text-2xl font-bold text-green-900">
                ${expense.amount}
              </Text>
            </View>
          </View>

          {/* Category */}
          <View className="flex-row items-center space-x-4 bg-sky-50 rounded-xl p-4 shadow-sm">
            <Ionicons name="pricetag-outline" size={36} color="#6b7280" />
            <View>
              <Text className="text-lg font-semibold text-sky-700">
                Category
              </Text>
              <Text className="text-xl text-sky-900">{expense.category}</Text>
            </View>
          </View>

          {/* Description */}
          {expense.description && (
            <View className="flex-row items-start space-x-4 bg-sky-50 rounded-xl p-4 shadow-sm">
              <Ionicons
                name="document-text-outline"
                size={36}
                color="#6b7280"
                className="mt-1"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-sky-700 mb-1">
                  Description
                </Text>
                <Text className="text-base text-sky-900">
                  {expense.description}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="flex items-end">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="w-1/2 flex-row justify-center items-center bg-red-600 rounded-xl py-4 mt-8 shadow-lg"
            disabled={deleteMutation.isLoading}
            activeOpacity={0.8}
          >
            {deleteMutation.isLoading ? (
              <Text className="text-white font-semibold text-lg">
                Deleting...
              </Text>
            ) : (
              <>
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="#fff"
                  className="mr-5"
                />
                <Text className="text-white font-semibold text-lg">
                  Delete Expense
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirm Delete Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
          <View className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <Text className="text-xl font-semibold mb-4 text-red-600 flex-row items-center">
              <Ionicons
                name="warning-outline"
                size={24}
                color="#dc2626"
                className="mr-2"
              />
              Confirm Delete
            </Text>
            <Text className="mb-6 text-gray-700">
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </Text>

            <View className="flex-row justify-end space-x-4">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="py-2 px-5 rounded-xl bg-gray-200"
                android_ripple={{ color: "#d1d5db" }}
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                className="py-2 px-5 rounded-xl bg-red-600"
                android_ripple={{ color: "#991b1b" }}
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
