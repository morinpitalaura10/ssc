import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotAdmin from "../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const ProfileAdmin = ({ navigation }) => {
  const profile = {
    nim: "2388010040",
    namaLengkap: "Morin Pita Laura",
    namaPanggilan: "Laura",
    role: "Admin",
    jurusan: "Informatika",
    ttl: "Bandung, 10 Mei",
  };

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="PROFIL" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 30, paddingBottom: 100 }}
      >
        {/* CARD UTAMA */}
        <CardBg>
          {/* FOTO PROFIL */}
          <View style={GlobalStyles.profileImageContainer}>
            <Image
              source={require("../../assets/morin.jpg")}
              style={GlobalStyles.profileImage}
              resizeMode="cover"
            />
          </View>

          {/* IDENTITAS */}
          {Object.entries(profile).map(([key, value], index) => (
            <View key={index} style={GlobalStyles.profileField}>
              <Text style={GlobalStyles.fieldLabel}>
                {key === "nim"
                  ? "NIM"
                  : key === "namaLengkap"
                  ? "Nama Lengkap"
                  : key === "namaPanggilan"
                  ? "Nama Panggilan"
                  : key === "role"
                  ? "Role"
                  : key === "jurusan"
                  ? "Jurusan"
                  : "Tempat, Tanggal Lahir"}
              </Text>

              <View style={GlobalStyles.fieldBox}>
                <Text style={GlobalStyles.fieldValue}>{value}</Text>
              </View>
            </View>
          ))}
        </CardBg>
      </ScrollView>

      {/* NAVIGASI BAWAH */}
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default ProfileAdmin;
