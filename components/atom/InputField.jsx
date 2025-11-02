// components/atoms/InputField.jsx
import React from "react";
import { TextInput } from "react-native";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#999"
    style={GlobalStyles.input}
  />
);

export default InputField;
