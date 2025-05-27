import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabBarIcon = ({ name, color }: { name: keyof typeof Ionicons.glyphMap; color: string }) => (
  <Ionicons name={name} size={24} color={color} />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          marginHorizontal: 10,
          height: 60,
          borderRadius: 30,
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarActiveTintColor: "#0ea5e9",
        tabBarInactiveTintColor: "#94a3b8",
      }}
      safeAreaInsets={{ bottom: 0 }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => (
            <View className="absolute -top-5 w-[70px] h-[70px] rounded-full bg-sky-500 justify-center items-center shadow-md shadow-black/20">
              <Ionicons name="add" size={28} color="white" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}