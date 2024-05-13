import Colors from "@/constants/Colors";
import React from "react";

import { Text, Pressable as RNPressable } from "react-native";
import { StyleSheet } from "react-native";

interface PressableProps {
  textElement: React.JSX.Element;
  disabled?: boolean;
  buttonColour?: string;
  textColour?: string;
  otherTextStyles?: {
    [key: string]: any;
  };
  otherButtonStyles?: {
    [key: string]: any;
  };
  onPress?: () => void;
}

const Pressable = ({
  textElement,
  disabled = false,
  onPress,
  otherTextStyles,
  otherButtonStyles,
  buttonColour = Colors.primary,
  textColour = "black",
}: PressableProps) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: buttonColour,
      padding: 10,
      borderRadius: 5,
      ...otherButtonStyles,
    },
    text: {
      color: textColour,
      textAlign: "center",
      fontWeight: "600",
      ...otherTextStyles,
    },
  });

  return (
    <RNPressable style={styles.button} onPress={onPress} disabled={disabled}>
      {{ ...textElement, props: { ...textElement.props, style: styles.text } }}
    </RNPressable>
  );
};

export default Pressable;
