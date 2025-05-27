import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/customHeader";
import CustomButton from "@/components/common/customButton";
import { useAddExpense } from "@/hooks/useAddExpense";

const AddExpens = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { addExpense, isLoading } = useAddExpense();

  const handleSubmit = () => {
    if (!amount || !category) {
      return;
    }

    addExpense({
      amount,
      description,
      category,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader title="Add Expense" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text className="text-xl font-semibold mb-2 text-gray-800">
            Amount
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g. 12000"
            keyboardType="numeric"
            className="border rounded-xl p-4 mb-4"
          />

          <Text className="text-xl font-semibold mb-2 text-gray-800">
            Category
          </Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="e.g. Food, Transport"
            className="border rounded-xl p-4 mb-4"
          />

          <Text className="text-xl font-semibold mb-2 text-gray-800">
            Description (optional)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your expense"
            multiline
            className="border rounded-xl p-4"
            style={{ textAlignVertical: "top" }}
            numberOfLines={4}
          />

          <View className="mt-6">
            <CustomButton
              isSubmitting={isLoading}
              handleFunction={handleSubmit}
              bgColor="#0ea5e9"
              textColor="#fff"
              borderRadius={50}
              fontSize={16}
              fontWeight="600"
              px={16}
              py={14}
            >
              Add Expense
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpens;
