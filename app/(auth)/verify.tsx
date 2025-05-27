import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { router } from "expo-router";
import CustomButton from "@/components/common/customButton";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/(auth)/reset");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-3">
        <View className="items-center justify-center mt-10">
          <Text className="text-2xl font-bold">Verify OTP</Text>
          <Text className="font-bold text-gray-400 mt-2 text-center">
            Enter the OTP sent to your email
          </Text>
        </View>

        <View className="mt-2 items-center bg-blue-300 h-20">
          <OTPInputView
            pinCount={6}
            style={{ width: "100%" }}
            codeInputFieldStyle={{
              borderColor: "#000",
              marginHorizontal: 2,
              borderRadius: 15,
              textAlign: "center",
              fontSize: 18,
              color: "#000",
            }}
            onCodeFilled={(code) => {
              setOtp(code);
            }}
          />
        </View>

        <View className="items-center mt-2">
          <CustomButton
            borderRadius={50}
            isSubmitting={isSubmitting}
            handleFunction={handleVerify}
          >
            Verify
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOtpPage;
