import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const PublicHome = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="SIMAK-UIN" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >

        {/* CARD FITUR */}
        <View style={{ gap: 20 }}>
          {/* === CARD 1 === */}
          <TouchableOpacity
            onPress={() => navigation.navigate("OrmawaHome")}
            style={GlobalStyles.cardHomeWithImage}
          >
            <Image
              source={require("../../assets/ormawa.jpg")} // 📷 gambar card ORMAWA
              style={GlobalStyles.cardImage}
            />
            <View style={GlobalStyles.cardContent}>
              <Ionicons
                name="school"
                size={36}
                color={Colors.primary}
                style={GlobalStyles.cardIcon}
              />
              <View>
                <Text style={GlobalStyles.cardTitle}>ORMAWA</Text>
                <Text style={GlobalStyles.cardText}>
                  Lihat daftar organisasi aktif di kampus.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* === CARD 2 === */}
          <TouchableOpacity
            onPress={() => navigation.navigate("UkmHome")}
            style={GlobalStyles.cardHomeWithImage}
          >
            <Image
              source={require("../../assets/ukm.jpg")} // 📷 gambar card UKM
              style={GlobalStyles.cardImage}
            />
            <View style={GlobalStyles.cardContent}>
              <Ionicons
                name="people-circle"
                size={36}
                color={Colors.primary}
                style={GlobalStyles.cardIcon}
              />
              <View>
                <Text style={GlobalStyles.cardTitle}>UKM</Text>
                <Text style={GlobalStyles.cardText}>
                  Temukan UKM sesuai minat dan bakatmu.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* === CARD 3 === */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AcaraHome")}
            style={GlobalStyles.cardHomeWithImage}
          >
            <Image
              source={require("../../assets/event.jpg")} // 📷 gambar card Acara
              style={GlobalStyles.cardImage}
            />
            <View style={GlobalStyles.cardContent}>
              <Ionicons
                name="calendar"
                size={36}
                color={Colors.primary}
                style={GlobalStyles.cardIcon}
              />
              <View>
                <Text style={GlobalStyles.cardTitle}>EVENT KAMPUS</Text>
                <Text style={GlobalStyles.cardText}>
                  Ikuti berbagai kegiatan kampus terkini.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* NAV BOTTOM */}
      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default PublicHome;
