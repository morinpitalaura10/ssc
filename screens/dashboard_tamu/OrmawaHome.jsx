import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderPrimary from "../../components/atom/HeaderPrimary";

const OrmawaHome = ({ navigation }) => {
  const ormawaList = [
    {
      id: 1,
      name: "SEMA UINSSC",
      image: require("../../assets/logosemau.png"),
      desc:
        "Senat Mahasiswa Universitas Islam Negeri Siber Syekh Nurjati Cirebon (SEMA UINSSC) merupakan lembaga legislatif tertinggi di tingkat universitas yang berperan dalam pengawasan, aspirasi, dan kebijakan mahasiswa di lingkungan kampus.",
    },
    {
      id: 2,
      name: "SEMA FITK",
      image: require("../../assets/logosemaf.jpg"),
      desc:
        "SEMA FITK adalah lembaga legislatif di Fakultas Ilmu Tarbiyah dan Keguruan yang berfungsi menampung dan menyuarakan aspirasi mahasiswa serta memastikan pelaksanaan kebijakan akademik dan kemahasiswaan berjalan dengan baik.",
    },
    {
      id: 3,
      name: "DEMA UINSSC",
      image: require("../../assets/logodemau.png"),
      desc:
        "Dewan Eksekutif Mahasiswa Universitas Islam Negeri Siber Syekh Nurjati Cirebon (DEMA UINSSC) bertanggung jawab dalam pelaksanaan program kegiatan mahasiswa tingkat universitas dan menjadi motor penggerak kegiatan kemahasiswaan yang bersifat akademik maupun sosial.",
    },
    {
      id: 4,
      name: "DEMA FITK",
      image: require("../../assets/logodemaf.jpg"),
      desc:
        "DEMA FITK adalah organisasi eksekutif mahasiswa di tingkat fakultas yang berperan aktif dalam pengembangan minat, bakat, serta peningkatan kompetensi mahasiswa di bidang pendidikan dan keguruan.",
    },
    {
      id: 5,
      name: "HIMAFOR",
      image: require("../../assets/logohmj.png"),
      desc:
        "Himpunan Mahasiswa Informatika (HIMAFOR) merupakan wadah bagi mahasiswa jurusan Informatika untuk mengembangkan kemampuan di bidang teknologi, riset, dan inovasi digital melalui kegiatan akademik dan non-akademik.",
    },
  ];

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="ORMAWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Deskripsi Umum */}
        <CardBg>
          <Text style={GlobalStyles.cardTitle}>Tentang ORMAWA</Text>
          <Text style={GlobalStyles.cardText}>
            Organisasi Mahasiswa (ORMAWA) adalah wadah bagi mahasiswa untuk
            mengembangkan kemampuan kepemimpinan, berorganisasi, dan membangun
            jejaring sosial. Bergabung dengan ORMAWA dapat meningkatkan
            pengalaman dan kontribusi nyata di lingkungan kampus.
          </Text>
        </CardBg>

        {/* Daftar ORMAWA */}
        <Text style={[GlobalStyles.sectionTitle, { marginTop: 10 }]}>
          DAFTAR ORMAWA AKTIF
        </Text>

        {ormawaList.map((ormawa) => (
          <View
            key={ormawa.id}
            style={[
              GlobalStyles.cardHomeWithImage,
              { backgroundColor: Colors.white },
            ]}
          >
            <Image source={ormawa.image} style={GlobalStyles.cardImage2} />
            <View style={GlobalStyles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={GlobalStyles.cardTitle}>{ormawa.name}</Text>
                <Text style={GlobalStyles.cardText}>{ormawa.desc}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default OrmawaHome;
