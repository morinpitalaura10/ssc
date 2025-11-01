// components/atoms/TextLabel.jsx
import React from "react";
import { Text } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const TextLabel = ({ text, size = 16, color = Colors.textPrimary, bold = false }) => (
  <Text
    style={{
      fontSize: size,
      color: color,
      fontWeight: bold ? "700" : "400",
      marginBottom: 4,
    }}
  >
    {text}
  </Text>
);

export default TextLabel;
