import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface CustomInputProps {
  label: string;
  placeholder: string;
  width?: string | number;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "number" | "password";
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  width = "100%",
  value,
  onChangeText,
  type = "text",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === "password";

  return (
    <View
      className="relative mt-8 border rounded-xl"
      style={{ width } as ViewStyle}
    >
      <Text className="absolute left-3 top-[-8px] text-xs bg-gray-100 px-3 font-bold">
        {label}
      </Text>
      <View className="w-full flex-row items-center px-3 py-1.5">
        <TextInput
          className="flex-1 text-gray-700 font-semibold"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={type === "number" ? "numeric" : "default"}
          secureTextEntry={isPasswordType && !isPasswordVisible}
          placeholderTextColor="#888"
        />

        {isPasswordType && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Feather
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={22}
              color="#555"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
