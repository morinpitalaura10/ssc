import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderSecondary from "../../components/atom/HeaderSecondary";

const UkmHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <HeaderSecondary title="UKM" />

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
          <Text style={GlobalStyles.cardTitle}>Tentang UKM</Text>
          <Text style={GlobalStyles.cardText}>
            Unit Kegiatan Mahasiswa (UKM) merupakan organisasi non-akademik yang
            berfokus pada minat dan bakat mahasiswa, mulai dari seni, olahraga,
            hingga riset dan kewirausahaan.
          </Text>
        </CardBg>

        <CardBg>
          <Text style={GlobalStyles.cardTitle}>Daftar UKM Kampus</Text>
          <Text style={GlobalStyles.cardText}>
            • UKM Paduan Suara {"\n"}
            • UKM Futsal {"\n"}
            • UKM English Club {"\n"}
            • UKM Kewirausahaan {"\n"}
            • UKM Mapala
          </Text>
        </CardBg>
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default UkmHome;
