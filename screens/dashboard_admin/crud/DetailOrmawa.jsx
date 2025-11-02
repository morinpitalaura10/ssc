import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { GlobalStyles, Colors } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";

const DetailOrmawa = ({ navigation }) => {
  const data = {
    namaOrmawa: "Himpunan Informatika",
    ketua: "Mochammad Suchi Ramadhani",
    deskripsi: "Organisasi mahasiswa jurusan Informatika.",
    kontak: "08123456789",
  };

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="DETAIL ORMAWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Informasi ORMAWA</Text>

          {/* 🖼️ Foto/logo ormawa */}
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Image
              source={require("../../../assets/icon.png")} // ganti sesuai logo ormawa kamu
              style={{
                width: 120,
                height: 120,
                borderRadius: 15,
                marginBottom: 10,
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: Colors.primary,
              }}
            >
              {data.namaOrmawa}
            </Text>
          </View>

          {/* === DATA DETAIL === */}
          {Object.entries(data)
            .filter(([key]) => key !== "namaOrmawa") // nama udah ditampilkan di atas
            .map(([key, value], index) => (
              <View key={index} style={GlobalStyles.profileField}>
                <Text style={GlobalStyles.fieldLabel}>
                  {key === "ketua"
                    ? "Nama Ketua"
                    : key === "deskripsi"
                    ? "Deskripsi"
                    : "Kontak"}
                </Text>

                <View style={GlobalStyles.fieldBox}>
                  <Text style={GlobalStyles.fieldValue}>{value}</Text>
                </View>
              </View>
            ))}

          {/* Tombol kembali */}
          <TouchableOpacity
            style={[GlobalStyles.btnPrimary, { marginTop: 20 }]}
            onPress={() => navigation.replace("CrudOrmawa")}
          >
            <Text style={GlobalStyles.btnText}>Kembali</Text>
          </TouchableOpacity>
        </CardBg>
      </ScrollView>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default DetailOrmawa;
