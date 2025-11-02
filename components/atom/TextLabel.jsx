// components/atoms/TextLabel.jsx
import React from "react";
import { Text } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

const TextLabel = ({ text }) => (
  <Text style={GlobalStyles.textLabel}>{text}</Text>
);

export default TextLabel;
