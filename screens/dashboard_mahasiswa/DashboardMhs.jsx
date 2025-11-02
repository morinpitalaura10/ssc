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
      image: require("../../assets/batik.jpg"),
      nama: "Hari Batik 2025",
      tanggal: "2 Oktober 2025",
      deskripsi: "Mari terus lestarikan dan bangga mengenakan batik sebagai identitas bangsa, karena setiap goresannya menyimpan cerita tentang keindahan, kesabaran, dan kebanggaan.",
      pemain: "Cemara's",
    },
    {
      id: 2,
      image: require("../../assets/haji.jpg"),
      nama: "Naik Haji bersama mahasiswa UIN",
      tanggal: "25 Mei 2025",
      deskripsi: "Belajar haji bukan hanya soal rukun dan syarat, tapi juga tentang hati yang siap berhijrah menuju ridha-Nya.",
      pemain: "B Boys and B Girls",
    },
    {
      id: 3,
      image: require("../../assets/nari.jpg"),
      nama: "Pengenalan Dosen Informatika",
      tanggal: "10 September 2025",
      deskripsi: "Inilah para dosen Informatika UIN; sosok inspiratif yang nggak cuma ngajarin sintaks dan algoritma, tapi juga nilai, semangat, dan arah menuju masa depan digital yang cerah!",
      pemain: "Seluruh Mahasiswa dan Dosen Informatika",
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
        <Text style={GlobalStyles.sectionTitle}>Selamat Datang, Dika !</Text>

        {/* LIST ACARA */}
        {acaraList.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={GlobalStyles.cardHomeWithImage}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("BatikHome", { item })} // ⬅️ ke halaman detail BatikHome
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
      </ScrollView>

      {/* NAV BAWAH */}
      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default DashboardMhs;
