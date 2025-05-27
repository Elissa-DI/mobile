import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { router } from "expo-router";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/(auth)/login");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-3">
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-2xl font-bold">Reset Password</Text>
          <Text className="font-bold text-gray-400 mt-2 text-center">
            Set your new password
          </Text>
        </View>

        <View className="mt-6">
          <CustomInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            type="password"
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
          />
        </View>

        <View className="flex-1 items-center justify-between mt-8">
          <CustomButton
            borderRadius={50}
            isSubmitting={isSubmitting}
            handleFunction={handleReset}
          >
            Reset Password
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordPage;
