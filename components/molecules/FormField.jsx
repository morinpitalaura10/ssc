import React from "react";
import { View, TouchableOpacity } from "react-native";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import InputField from "../atom/InputField";
import TextLabel from "../atom/TextLabel";
import { Ionicons } from "@expo/vector-icons";


const FormField = ({ label, placeholder, value, onChangeText, secureTextEntry, showUpload, onUpload }) => {
  return (
    <View style={GlobalStyles.formField}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextLabel text={label} bold size={14} />
        {showUpload && (
          <TouchableOpacity onPress={onUpload}>
            <Ionicons name="image-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
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