import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderSecondary from "../../components/atom/HeaderSecondary";

const AcaraHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <HeaderSecondary title="EVENT KAMPUS" />

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
          <Text style={GlobalStyles.cardTitle}>Event Kampus</Text>
          <Text style={GlobalStyles.cardText}>
            SIMAK-UIN membantu mahasiswa mengikuti berbagai kegiatan kampus
            seperti seminar, workshop, lomba, hingga kegiatan sosial. Jangan
            lewatkan setiap event menarik yang meningkatkan pengalaman kampusmu!
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>Agenda Terdekat</Text>
          <Text style={GlobalStyles.cardText}>
            • Seminar Teknologi – 5 November 2025 {"\n"}
            • Festival Seni Mahasiswa – 10 November 2025 {"\n"}
            • Workshop Kewirausahaan – 15 November 2025 {"\n"}
            • Donor Darah – 20 November 2025
          </Text>
        </CardBg>
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default AcaraHome;
