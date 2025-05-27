import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { Link, router } from "expo-router";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().max(15, "Password must be at most 15 characters long"),
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof typeof errors] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const user = await loginUser(email);

      if (user.password !== password) {
        setErrors({ password: "Incorrect password." });
      } else {
        await login(user);
        router.push("/(tabs)");
      }
    } catch (error: any) {
      setErrors({ email: error.message || "Login failed" });
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

        <View className="mt-6">
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            type="text"
          />
          {errors.email && (
            <Text className="text-sm text-red-600 mt-1">{errors.email}</Text>
          )}

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          {errors.password && (
            <Text className="text-sm text-red-600 mt-1">{errors.password}</Text>
          )}

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
