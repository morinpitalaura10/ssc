import React, { useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import NavBotAdmin from "../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import { AuthContext } from "../../context/AuthContext";

const DashboardAdmin = ({ navigation }) => {
  const { user } = useContext(AuthContext); // ✅ ambil dari login

  const menuAdmin = [
    {
      id: 1,
      title: "KELOLA MAHASISWA AKTIF",
      desc: "Tambah, ubah, dan hapus data mahasiswa terdaftar.",
      image: require("../../assets/uin.jpg"),
      nav: "CrudMahasiswa",
    },
    {
      id: 2,
      title: "KELOLA ORMAWA",
      desc: "Lihat dan kelola daftar organisasi aktif kampus.",
      image: require("../../assets/ormawa.jpg"),
      nav: "CrudOrmawa",
    },
    {
      id: 3,
      title: "KELOLA ACARA KAMPUS",
      desc: "Tambah, edit, atau hapus acara dan event kampus.",
      image: require("../../assets/event.jpg"),
      nav: "CrudAcara",
    },
    {
      id: 4,
      title: "KELOLA UKM KAMPUS",
      desc: "Tambah, edit, atau hapus UKM kampus.",
      image: require("../../assets/ormawa.jpg"),
      nav: "CrudUKM",
    },
    {
      id: 5,
      title: "PENGATURAN SISTEM",
      desc: "Ubah konfigurasi aplikasi dan data umum kampus.",
      image: require("../../assets/icon.png"),
      nav: "CrudPengaturan",
    },
  ];

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="ADMIN" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        <Text style={GlobalStyles.welcomeText}>
          Selamat Datang, {user?.name || "Admin"} !
        </Text>

        {menuAdmin.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={GlobalStyles.cardHomeWithImage}
            activeOpacity={0.9}
            onPress={() => navigation.navigate(item.nav)}
          >
            <Image source={item.image} style={GlobalStyles.cardImage} />
            <View style={GlobalStyles.cardAdminContent}>
              <Text style={GlobalStyles.cardAdminTitle}>{item.title}</Text>
              <Text style={GlobalStyles.cardAdminDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default DashboardAdmin;
