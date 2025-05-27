import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { signup } from "@/services/authService";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    if (!firstName.trim()) {
      toast.show("First name is required", { type: "danger" });
      return;
    }
    if (!lastName.trim()) {
      toast.show("Last name is required", { type: "danger" });
      return;
    }
    if (!email.trim()) {
      toast.show("Email is required", { type: "danger" });
      return;
    }
    if (!password) {
      toast.show("Password is required", { type: "danger" });
      return;
    }
    if (password !== confirmPassword) {
      toast.show("Passwords do not match", { type: "danger" });
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        username: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      toast.show("Account created successfully!", { type: "success" });
      router.push("/(auth)/login");
    } catch (error: any) {
      toast.show(error.message || "Signup failed", { type: "danger" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-3">
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-2xl font-bold">Sign Up</Text>
          <Text className="font-bold text-gray-400 mt-2">
            Create your account to get started
          </Text>
        </View>

        <View>
          <View className="flex-row justify-between items-center space-x-3">
            <CustomInput
              width={"48%"}
              label="First Name"
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <CustomInput
              width={"48%"}
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            type="text"
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
          />
        </View>

        <View className="flex-1 items-center justify-between mt-8">
          <CustomButton
            borderRadius={50}
            isSubmitting={isSubmitting}
            handleFunction={handleRegister}
          >
            Register
          </CustomButton>
        </View>

        <View className="flex-row justify-center items-center space-x-3 mb-10">
          <Text className="text-gray-400 font-semibold text-center">
            Already have an account?
          </Text>
          <Link
            href="/(auth)/login"
            className="font-bold text-sky-500 underline"
          >
            Login
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;
