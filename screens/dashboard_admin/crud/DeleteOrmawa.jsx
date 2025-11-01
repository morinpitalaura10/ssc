import React from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors } from "../../../styles/GlobalStyles";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import CardBg from "../../../components/molecules/CardBg";

const DeleteOrmawa = ({ navigation }) => {
  // contoh data dummy
  const dataOrmawa = [
    { id: 1, nama: "Himpunan Informatika", ketua: "Rafi Ahmad" },
    { id: 2, nama: "BEM Fakultas Saintek", ketua: "Siti Nurhaliza" },
    { id: 3, nama: "UKM Robotika", ketua: "Dimas Arif" },
  ];

  // fungsi hapus dengan konfirmasi
  const handleDelete = (nama) => {
    Alert.alert(
      "Konfirmasi Hapus",
      `Apakah kamu yakin ingin menghapus ${nama}?`,
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Berhasil",
              `Data ${nama} berhasil dihapus ✅`,
              [
                {
                  text: "OK",
                  onPress: () => navigation.replace("CrudOrmawa"),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ]
    );
  };

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="HAPUS ORMAWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {dataOrmawa.map((item) => (
          <CardBg key={item.id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: Colors.primary,
                  }}
                >
                  {item.nama}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.textSecondary,
                    marginTop: 4,
                  }}
                >
                  Ketua: {item.ketua}
                </Text>
              </View>

              {/* Icon Hapus */}
              <TouchableOpacity onPress={() => handleDelete(item.nama)}>
                <Ionicons name="trash" size={28} color={Colors.danger} />
              </TouchableOpacity>
            </View>
          </CardBg>
        ))}

        {/* Tombol kembali ke CRUD */}
        <TouchableOpacity
          style={[GlobalStyles.btnPrimary, { marginTop: 20 }]}
          onPress={() => navigation.replace("CrudOrmawa")}
        >
          <Text style={GlobalStyles.btnText}>Kembali</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default DeleteOrmawa;
