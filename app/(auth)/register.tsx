import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/common/customInput";
import CustomButton from "@/components/common/customButton";
import { Link, router } from "expo-router";
import { signup } from "@/services/authService";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Errors = Partial<Record<keyof z.infer<typeof registerSchema>, string>>;

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
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
    setIsSubmitting(true);

    try {
      await signup({
        username: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      router.push("/(auth)/login");
    } catch (error: any) {
      setErrors({ email: error.message || "Signup failed" });
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
            <View className="w-[48%]">
              <CustomInput
                label="First Name"
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
              {errors.firstName && (
                <Text className="text-sm text-red-600">{errors.firstName}</Text>
              )}
            </View>

            <View className="w-[48%]">
              <CustomInput
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              {errors.lastName && (
                <Text className="text-sm text-red-600">{errors.lastName}</Text>
              )}
            </View>
          </View>

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

          <CustomInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
          />
          {errors.confirmPassword && (
            <Text className="text-sm text-red-600 mt-1">
              {errors.confirmPassword}
            </Text>
          )}
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
