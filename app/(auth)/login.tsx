import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { Link, router } from "expo-router";
import { loginUser } from "@/services/authService";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const toast = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.show("Email and password are required.", { type: "danger" });
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await loginUser(email);

      if (user.password !== password) {
        toast.show("Incorrect password.", { type: "danger" });
      } else {
        await login(user);
        // Login successful, navigate to dashboard
        toast.show("Login successful!", { type: "success" });
        router.push("/(tabs)");
      }
    } catch (error: any) {
      toast.show(error.message || "Login failed", { type: "danger" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-3">
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-2xl font-bold">Sign In</Text>
          <Text className="font-bold text-gray-400 mt-2">
            Hi! Welcome back, you’ve been missed
          </Text>
        </View>

        <View>
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
          <View className="flex-row justify-end mt-1">
            <Link
              href="/(auth)/forgot"
              className="font-semibold text-sky-500 underline"
            >
              Forgot Password?
            </Link>
          </View>
        </View>

        <View className="flex-1 items-center justify-between mt-8">
          <CustomButton
            borderRadius={50}
            isSubmitting={isSubmitting}
            handleFunction={handleLogin}
          >
            Log In
          </CustomButton>
        </View>

        <View className="flex-row justify-center items-center space-x-3 mb-10">
          <Text className="text-gray-400 font-semibold text-center">
            Don&#39;t have an account?
          </Text>
          <Link
            href="/(auth)/register"
            className="font-bold text-sky-500 underline"
          >
            Signup
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
