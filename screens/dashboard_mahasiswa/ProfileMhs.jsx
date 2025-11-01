import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const ProfileMhs = ({ navigation }) => {
  const profile = {
    nim: "2388010033",
    namaLengkap: "Dika Hasan Nugroho",
    namaPanggilan: "Hasan",
    role: "Mahasiswa",
    jurusan: "Teknik Informatika",
    ttl: "Majalengka, 17 Agustus 2005",
  };

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="PROFIL MAHASISWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 30, paddingBottom: 100 }}
      >
        {/* CARD UTAMA */}
        <CardBg>
          {/* FOTO PROFIL */}
          <View style={GlobalStyles.profileImageContainer}>
            <Image
              source={require("../../assets/dika.jpg")} // ubah sesuai nama file fotomu
              style={GlobalStyles.profileImage}
              resizeMode="cover"
            />
          </View>

          {/* IDENTITAS MAHASISWA */}
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
      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default ProfileMhs;
