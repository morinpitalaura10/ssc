import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const BatikHome = ({ navigation }) => {
  const data = {
    namaBatik: "Hari Batik Nasional",
    tanggal: "2 Oktober 2025",
    deskripsi:
      "Hari Batik Nasional diperingati setiap tanggal 2 Oktober untuk merayakan pengakuan UNESCO terhadap batik sebagai Warisan Budaya Takbenda Dunia asal Indonesia. Batik bukan hanya kain bermotif, tapi juga simbol filosofi dan identitas bangsa.",
    makna:
      "Setiap goresan motif batik mengandung makna kehidupan seperti kesabaran, ketekunan, dan harmoni. Mahasiswa diharapkan menjaga warisan ini melalui kreativitas dan kebanggaan terhadap budaya Indonesia.",
  };

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="HARI BATIK NASIONAL" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Peringatan Hari Batik</Text>

          {/* 🖼️ FOTO BATIK */}
          <View style={GlobalStyles.centeredImageContainer}>
            <Image
              source={require("../../assets/batik.jpg")}
              style={GlobalStyles.detailImage}
              resizeMode="cover"
            />
            <Text style={GlobalStyles.itemTitle}>{data.namaBatik}</Text>
            <Text style={GlobalStyles.itemSubtitle}>{data.tanggal}</Text>
          </View>

          {/* === DESKRIPSI === */}
          <View style={GlobalStyles.profileField}>
            <Text style={GlobalStyles.fieldLabel}>Deskripsi</Text>
            <View style={GlobalStyles.fieldBox}>
              <Text style={GlobalStyles.fieldValue}>{data.deskripsi}</Text>
            </View>
          </View>

          <View style={GlobalStyles.profileField}>
            <Text style={GlobalStyles.fieldLabel}>Makna Filosofis</Text>
            <View style={GlobalStyles.fieldBox}>
              <Text style={GlobalStyles.fieldValue}>{data.makna}</Text>
            </View>
          </View>

        </CardBg>
      </ScrollView>

      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default BatikHome;
