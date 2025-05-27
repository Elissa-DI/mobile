import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';

interface CustomButtonProps {
  width?: DimensionValue;
  borderRadius?: number;
  px?: number;
  py?: number;
  isSubmitting: boolean;
  handleFunction: () => void;
  children: React.ReactNode;

  // Optional overrides
  bgColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width = '100%',
  borderRadius = 8,
  px = 16,
  py = 14,
  isSubmitting,
  handleFunction,
  children,
  bgColor = '#000000',
  textColor = '#fff',
  fontSize = 15,
  fontWeight = '600',
  buttonStyle,
  textStyle,
}) => {
  const defaultButtonStyle: ViewStyle = {
    width,
    borderRadius,
    paddingHorizontal: px,
    paddingVertical: py,
    backgroundColor: bgColor,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const defaultTextStyle: TextStyle = {
    color: textColor,
    fontSize,
    fontWeight,
    textAlign: 'center',
  };

  return (
    <TouchableOpacity
      style={{ ...defaultButtonStyle, ...buttonStyle }}
      onPress={handleFunction}
    >
      {isSubmitting ? (
        <ActivityIndicator color={textColor} size={24} />
      ) : (
        <Text style={{ ...defaultTextStyle, ...textStyle }}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
