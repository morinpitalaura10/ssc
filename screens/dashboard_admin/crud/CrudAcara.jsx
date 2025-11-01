import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";

const CrudAcara = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="KELOLA EVENT KAMPUS" />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => alert("Tambah Acara")}
        >
          <Ionicons name="add-circle" size={40} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>ADD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => alert("Detail Acara")}
        >
          <Ionicons name="calendar" size={40} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>DETAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => alert("Update Acara")}
        >
          <Ionicons name="create" size={40} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>UPDATE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => alert("Hapus Acara")}
        >
          <Ionicons name="trash" size={40} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>
            DELETE
          </Text>
        </TouchableOpacity>
      </View>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CrudAcara;
