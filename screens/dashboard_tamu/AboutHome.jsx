import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const AboutHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <HeaderPrimary title="TENTANG SIMAK-UIN" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        
        {/* Informasi utama */}
        <CardBg>
          <Text style={GlobalStyles.cardTitle}>📚 Tujuan Aplikasi</Text>
          <Text style={GlobalStyles.cardText}>
            SIMAK-UIN bertujuan mempermudah mahasiswa, ormawa, dan admin dalam
            mengakses serta mengelola kegiatan kampus. Semua data ormawa, UKM,
            dan acara kampus terintegrasi dalam satu sistem.
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>🧩 Fitur Utama</Text>
          <Text style={GlobalStyles.cardText}>
            • Dashboard peran pengguna (Admin, Mahasiswa, Tamu) {"\n"}
            • Data Ormawa, UKM, dan Acara Kampus {"\n"}
            • Login role-based {"\n"}
            • Navigasi bawah interaktif {"\n"}
            • Tampilan modern dan ramah pengguna
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>💡 Pengembang</Text>
          <Text style={GlobalStyles.cardText}>
            Aplikasi ini dikembangkan oleh mahasiswa UIN sebagai proyek
            Pemrograman Mobile, dengan tujuan menghadirkan sistem informasi
            kampus yang efisien dan informatif.
          </Text>
        </CardBg>
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default AboutHome;
