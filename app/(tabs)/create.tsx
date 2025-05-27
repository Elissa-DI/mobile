import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddExpense } from "@/hooks/useAddExpense";
import CustomInput from "@/components/common/customInput";
import { z } from "zod";

const expenseSchema = z.object({
  amount: z
    .string()
    .nonempty("Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  category: z.string().nonempty("Category is required"),
  description: z.string().optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof expenseSchema>, string>>;

const AddExpens = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { addExpense, isLoading } = useAddExpense();

  const handleSubmit = () => {
    const result = expenseSchema.safeParse({
      amount,
      category,
      description,
    });

    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    addExpense({
      amount,
      category,
      description,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row justify-between pt-10 mb-4 px-4">
        <Text className="text-xl font-bold text-primary">Add Expense</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          className={`flex-row items-center space-x-2 px-4 py-2 rounded-full ${
            isLoading ? "bg-sky-300" : "bg-sky-500"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="font-semibold text-white">Add</Text>
          )}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <CustomInput
            label="Amount"
            placeholder="e.g. 12000"
            type="number"
            value={amount}
            onChangeText={setAmount}
          />
          {errors.amount && (
            <Text className="text-sm text-red-600 mt-1">{errors.amount}</Text>
          )}

          <CustomInput
            label="Category"
            placeholder="e.g. Food, Transport"
            type="text"
            value={category}
            onChangeText={setCategory}
          />
          {errors.category && (
            <Text className="text-sm text-red-600 mt-1">{errors.category}</Text>
          )}

          <View className="mt-8 border rounded-xl" style={{ width: "100%" }}>
            <Text className="absolute left-3 top-[-8px] text-xs bg-gray-100 px-3 font-bold">
              Description (optional)
            </Text>
            <TextInput
              placeholder="Describe your expense"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#888"
              className="p-4 text-gray-700 font-semibold h-60"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpens;
