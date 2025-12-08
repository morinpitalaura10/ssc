import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import FormField from "../../../components/molecules/FormField";
import { supabase } from "../../../utils/supabase";
import * as ImagePicker from 'expo-image-picker';


const UpdateOrmawa = ({ navigation, route }) => {
  const { item } = route.params || {};


  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    namaOrmawa: "",
    ketua: "",
    deskripsi: "",
    kontak: "",
    gambarOrmawa: null,
  });


  useEffect(() => {
    if (item) {
      setData({
        namaOrmawa: item.nama_ormawa || "",
        ketua: item.ketua || "",
        deskripsi: item.desc || "",
        contact: item.contact || "",
        gambarOrmawa: item.logo || null,
      });
    }
  }, [item]);


  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });


    if (!result.canceled) {
      setData({ ...data, gambarOrmawa: result.assets[0].uri });
    }
  };


  const uploadImage = async (uri) => {
    if (!uri.startsWith('file://')) return uri; // Sudah URL remote


    const ext = uri.substring(uri.lastIndexOf('.') + 1);
    const fileName = `ormawa_${Date.now()}.${ext}`;


    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: fileName,
      type: `image/${ext}`
    });


    // Supabase JS v2 upload
    const { data: uploadData, error } = await supabase.storage
      .from('logo_ormawa')
      .upload(fileName, formData, {
        cacheControl: '3600',
        upsert: false
      });


    if (error) throw error;


    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('logo_ormawa')
      .getPublicUrl(fileName);


    return publicUrlData.publicUrl;
  };


  const handleUpdate = async () => {
    if (!item?.id) return;
    setLoading(true);


    try {
      let imageUrl = data.gambarOrmawa;


      // Jika gambar berubah (masih lokal URI), upload dulu
      if (data.gambarOrmawa && data.gambarOrmawa.startsWith('file://')) {
        imageUrl = await uploadImage(data.gambarOrmawa);
      }


      const { error } = await supabase
        .from('tbl_ormawa')
        .update({
          nama_ormawa: data.namaOrmawa,
          ketua: data.ketua,
          desc: data.deskripsi,
          contact: data.contact,
          logo: imageUrl
        })
        .eq('id', item.id);


      if (error) throw error;


      Alert.alert("Sukses", "Data berhasil diperbarui!", [
        { text: "OK", onPress: () => navigation.navigate("CrudOrmawa") } // atau navigation.goBack()
      ]);
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };


  if (!item) {
    return (
      <View style={GlobalStyles.container}>
        <HeaderPrimary title="UPDATE ORMAWA" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Data Ormawa tidak ditemukan.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={{ color: 'yellow' }}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="UPDATE ORMAWA" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Perbarui Data ORMAWA</Text>


          {/* Preview Image */}
          {data.gambarOrmawa ? (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Image
                source={{ uri: data.gambarOrmawa }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </View>
          ) : null}


          <FormField label="Nama ORMAWA" value={data.namaOrmawa} onChangeText={(t) => setData({ ...data, namaOrmawa: t })} />
          <FormField label="Nama Ketua" value={data.ketua} onChangeText={(t) => setData({ ...data, ketua: t })} />


          <FormField
            label="Deskripsi"
            value={data.deskripsi}
            onChangeText={(t) => setData({ ...data, deskripsi: t })}
            showUpload
            onUpload={handlePickImage}
          />
          <Text style={{ fontSize: 10, color: '#aaa', fontStyle: 'italic', marginBottom: 10, marginTop: -5 }}>*Klik ikon upload di kanan untuk ganti gambar</Text>


          <FormField label="Kontak" value={data.contact} onChangeText={(t) => setData({ ...data, contact: t })} />


          <TouchableOpacity
            style={[GlobalStyles.btnPrimary, { marginTop: 20, opacity: loading ? 0.7 : 1 }]}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={GlobalStyles.btnText}>Simpan Perubahan</Text>}
          </TouchableOpacity>
        </CardBg>
      </ScrollView>
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};


export default UpdateOrmawa;