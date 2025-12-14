import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const AboutHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="TENTANG SIMAK-UIN" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        <CardBg>
          <Text style={GlobalStyles.cardTitle}>📌 Apa itu SIMAK-UIN?</Text>
          <Text style={GlobalStyles.cardText}>
            SIMAK-UIN adalah aplikasi informasi kampus yang membantu mahasiswa dan masyarakat umum
            untuk melihat informasi ORMAWA, UKM, dan event kampus dalam satu tempat.
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>🎯 Tujuan</Text>
          <Text style={GlobalStyles.cardText}>
            Membuat informasi kegiatan kampus lebih mudah diakses, lebih rapi, dan lebih cepat.
            Kamu bisa lihat event yang sedang berlangsung, lalu daftar sebagai peserta.
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>🧩 Yang bisa kamu lakukan</Text>
          <Text style={GlobalStyles.cardText}>
            • Lihat daftar ORMAWA & UKM {"\n"}
            • Lihat event kampus terbaru {"\n"}
            • Daftar sebagai peserta event secara online {"\n"}
            • Dapat konfirmasi setelah daftar
          </Text>
        </CardBg>

        {/* CTA */}
        <CardBg>
          <Text style={GlobalStyles.cardTitle}>🚀 Siap ikut kegiatan?</Text>
          <Text style={GlobalStyles.cardText}>
            Kalau kamu tertarik jadi peserta event kampus, langsung daftar lewat tombol di bawah ini.
          </Text>

          <TouchableOpacity
            style={[GlobalStyles.btnPrimary, { marginTop: 14 }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("pendaftaran")}
          >
            <Text style={GlobalStyles.btnText}>Daftarkan Dirimu Sekarang</Text>
          </TouchableOpacity>
        </CardBg>

      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default AboutHome;
