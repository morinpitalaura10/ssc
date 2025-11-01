import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderSecondary from "../../components/atom/HeaderSecondary";

const OrmawaHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderSecondary title="ORMAWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Banner */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: "100%", height: 160, borderRadius: 15 }}
            resizeMode="cover"
          />
        </View>

        {/* Deskripsi */}
        <CardBg>
          <Text style={GlobalStyles.cardTitle}>Tentang ORMAWA</Text>
          <Text style={GlobalStyles.cardText}>
            Organisasi Mahasiswa (ORMAWA) adalah wadah bagi mahasiswa untuk
            mengembangkan kemampuan kepemimpinan, berorganisasi, dan membangun
            jejaring sosial. Bergabung dengan ORMAWA dapat meningkatkan
            pengalaman dan kontribusi nyata di lingkungan kampus.
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>Daftar ORMAWA Aktif</Text>
          <Text style={GlobalStyles.cardText}>
            • BEM Fakultas Sains dan Teknologi {"\n"}
            • DEMA Fakultas Tarbiyah {"\n"}
            • HIMATIF (Himpunan Mahasiswa Informatika) {"\n"}
            • HIMAKES (Himpunan Mahasiswa Kesehatan) {"\n"}
            • LDK Al-Fath
          </Text>
        </CardBg>
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default OrmawaHome;
