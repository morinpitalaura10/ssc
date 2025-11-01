import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const DashboardMhs = ({ navigation }) => {
  const acaraList = [
    {
      id: 1,
      image: require("../../assets/event.jpg"),
      nama: "Festival Seni Kampus 2025",
      tanggal: "12 November 2025",
      deskripsi: "Ajang unjuk bakat seni dari mahasiswa lintas jurusan.",
      pemain: "UKM Musik, UKM Tari, dan Teater UIN",
    },
    {
      id: 2,
      image: require("../../assets/event.jpg"),
      nama: "Seminar Teknologi & Inovasi",
      tanggal: "20 November 2025",
      deskripsi: "Membahas tren AI dan IoT dalam dunia kampus.",
      pemain: "Himpunan Informatika & Dosen Tamu ITB",
    },
    {
      id: 3,
      image: require("../../assets/event.jpg"),
      nama: "Lomba Debat Bahasa Inggris",
      tanggal: "28 November 2025",
      deskripsi: "Kompetisi debat antar fakultas tingkat universitas.",
      pemain: "UKM English Club",
    },
  ];

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="MAHASISWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        <Text style={GlobalStyles.sectionTitle}>Selamat Datang, Dika 👋</Text>

        {/* LIST ACARA */}
        {acaraList.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={GlobalStyles.cardHomeWithImage}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("DetailEvent", { item })}
          >
            <Image source={item.image} style={GlobalStyles.cardImage} />
            <View style={{ padding: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: Colors.primary,
                  marginBottom: 4,
                }}
              >
                {item.nama}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                📅 {item.tanggal}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.textSecondary,
                  marginBottom: 3,
                  textAlign: "justify",
                }}
              >
                {item.deskripsi}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.primary,
                  fontWeight: "600",
                }}
              >
                👤 {item.pemain}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* INFORMASI TAMBAHAN */}
        <View style={{ marginTop: 10 }}>
          <Text style={GlobalStyles.cardTitle}>🎓 Tetap Semangat!</Text>
          <Text style={GlobalStyles.cardText}>
            Ikuti semua kegiatan positif kampus, perluas koneksi dan pengalamanmu di UIN.
          </Text>
        </View>
      </ScrollView>

      {/* NAV BAWAH */}
      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default DashboardMhs;
