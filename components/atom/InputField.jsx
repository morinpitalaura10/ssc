import React from "react";
import { TextInput } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    placeholder={placeholder}
    placeholderTextColor="#999"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    style={GlobalStyles.input}
  />
);

export default InputField;
