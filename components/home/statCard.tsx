import React, { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";

type StatCardProps = {
  label: string;
  value: number | string;
  color?: string;
  onPress?: () => void;
};

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  color = "#0ea5e9",
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="flex-1 bg-sky-100 mr-3 rounded-xl items-center justify-center shadow-md shadow-sky-400/30 p-4"
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text
          className="font-bold text-xl"
          style={{ color }}
        >
          {typeof value === "number"
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : value}
        </Text>
        <Text className="mt-1 text-sm" style={{ color }}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default StatCard;
