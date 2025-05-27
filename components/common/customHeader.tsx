import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type CustomHeaderProps = {
  title: string;
  hideIcons?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  hideIcons = true,
}) => {
  return (
    <View className="flex-row items-center pt-10 mb-4 px-4">
      {hideIcons ? (
        // No back icon, center title horizontally
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-primary">{title}</Text>
        </View>
      ) : (
        // Back icon + title next to it, aligned left
        <View className="flex-row items-center space-x-3 flex-1">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary">{title}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
