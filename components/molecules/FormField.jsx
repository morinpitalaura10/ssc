import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

const FormField = ({ label, value, onChangeText, showUpload, onUpload }) => {
  return (
    <View style={GlobalStyles.formField}>
      <Text style={GlobalStyles.formLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={`Masukkan ${label}`}
        style={GlobalStyles.inputBox}
      />

      {/* Bagian Upload Gambar */}
      {showUpload && (
        <View style={GlobalStyles.uploadSection}>
          <Text style={GlobalStyles.uploadLabel}>Image:</Text>
          <TouchableOpacity style={GlobalStyles.uploadBtn} onPress={onUpload}>
            <Text style={GlobalStyles.uploadBtnText}>Upload Gambar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FormField;
