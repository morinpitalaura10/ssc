import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";

const CrudOrmawa = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="KELOLA ORMAWA" />

      {/* GRID ICON */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 25,
        }}
      >
        {/* === Tambah Data === */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => navigation.navigate("CreateOrmawa")}
        >
          <Ionicons name="add-circle" size={45} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>ADD</Text>
        </TouchableOpacity>

        {/* === Detail Data === */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => navigation.navigate("DetailOrmawa")}
        >
          <Ionicons
            name="information-circle" size={45} color={Colors.primary}/>
          <Text style={GlobalStyles.crudLabel}>DETAIL</Text>
        </TouchableOpacity>

        {/* === Update Data === */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => navigation.navigate("UpdateOrmawa")}
        >
          <Ionicons name="create" size={45} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>UPDATE</Text>
        </TouchableOpacity>

        {/* === Hapus Data === */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={GlobalStyles.crudIconBox}
          onPress={() => navigation.navigate("DeleteOrmawa")}
        >
          <Ionicons name="trash" size={45} color={Colors.primary} />
          <Text style={GlobalStyles.crudLabel}>
            HAPUS
          </Text>
        </TouchableOpacity>
      </View>

      {/* NAV BOTTOM */}
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CrudOrmawa;
