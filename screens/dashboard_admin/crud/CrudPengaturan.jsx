import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import CardBg from "../../../components/molecules/CardBg";

const CrudPengaturan = ({ navigation }) => {
  // daftar fitur pengaturan sistem
  const pengaturanList = [
    {
      id: 1,
      title: "Tema Aplikasi",
      desc: "Atur warna utama, mode gelap, dan tampilan UI.",
      icon: "color-palette",
      action: () => alert("Masuk ke pengaturan Tema Aplikasi 🎨"),
    },
    {
      id: 2,
      title: "Fitur Otomatis",
      desc: "Aktifkan fitur otomatisasi sistem seperti auto sync data.",
      icon: "refresh-circle",
      action: () => alert("Masuk ke pengaturan Fitur Otomatis 🔄"),
    },
    {
      id: 3,
      title: "Backup Data",
      desc: "Kelola penyimpanan & backup database secara berkala.",
      icon: "cloud-upload",
      action: () => alert("Masuk ke pengaturan Backup Data 💾"),
    },
    {
      id: 4,
      title: "Notifikasi",
      desc: "Atur pemberitahuan dan peringatan dalam aplikasi.",
      icon: "notifications",
      action: () => alert("Masuk ke pengaturan Notifikasi 🔔"),
    },
  ];

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="PENGATURAN SISTEM" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >

        {/* Card pengaturan */}
        {pengaturanList.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={item.action}
          >
            <CardBg>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={40}
                  color={Colors.primary}
                  style={{ marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: Colors.primary,
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: Colors.textSecondary,
                      fontSize: 14,
                      lineHeight: 20,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            </CardBg>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* NAV BOTTOM */}
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CrudPengaturan;
