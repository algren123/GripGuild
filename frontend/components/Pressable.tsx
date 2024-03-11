import Colors from '@/constants/Colors';
import React from 'react';

import { Text, Pressable as RNPressable } from 'react-native';
import { StyleSheet } from 'react-native';

interface PressableProps {
  buttonColour?: string;
  textColour?: string;
  text?: string;
  otherTextStyles?: {
    [key: string]: any;
  };
  otherButtonStyles?: {
    [key: string]: any;
  };
}

const Pressable = ({
  text,
  otherTextStyles,
  otherButtonStyles,
  buttonColour = Colors.primary,
  textColour = 'black',
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
      textAlign: 'center',
      fontWeight: '600',
      ...otherTextStyles,
    },
  });

  return (
    <RNPressable style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </RNPressable>
  );
};

export default Pressable;
