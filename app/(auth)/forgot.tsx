import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { router } from "expo-router";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/(auth)/verify");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-3">
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-2xl font-bold">Forgot Password</Text>
          <Text className="font-bold text-gray-400 mt-2 text-center">
            Enter your email to receive an OTP
          </Text>
        </View>

        <View className="mt-6">
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            type="text"
          />
        </View>

        <View className="flex-1 items-center justify-between mt-8">
          <CustomButton
            borderRadius={50}
            isSubmitting={isSubmitting}
            handleFunction={handleSendOtp}
          >
            Send OTP
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
