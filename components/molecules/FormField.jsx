import React from "react";
import { View } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import InputField from "../atom/InputField";
import TextLabel from "../atom/TextLabel";

const FormField = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={GlobalStyles.formField}>
      <TextLabel text={label} bold size={14} />
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default FormField;
