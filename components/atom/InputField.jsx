// components/atoms/InputField.jsx
import React from "react";
import { TextInput } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#999"
    style={{
      borderWidth: 1,
      borderColor: Colors.grayLight,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
      fontSize: 15,
      color: Colors.textPrimary,
      backgroundColor: Colors.white,
    }}
  />
);

export default InputField;
