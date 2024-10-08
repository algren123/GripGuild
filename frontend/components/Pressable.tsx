import React from "react";

import { Pressable as RNPressable } from "react-native";
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
  buttonColour = "#fff",
  textColour = "black",
}: PressableProps) => {
  const styles = StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 5,
      ...otherButtonStyles,
    },
    text: {
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
