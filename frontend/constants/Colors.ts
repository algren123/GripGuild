import { Theme } from "@react-navigation/native";

const tintColor = "#FFD449";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#FFD449",
    background: "#0e101c",
    card: "rgb(18, 18, 18)",
    text: "#fff",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};

export default {
  light: {
    text: "#0e101c",
    background: "#fff",
    tint: tintColor,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColor,
  },
  dark: {
    text: "#fff",
    background: "#0e101c",
    tint: tintColor,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColor,
  },
  primary: "#FFD449",
  warning: "#FF4949",
  success: "#4CD964",
  error: "#FF3B30",
  neutral: "#8E8E93",
};
