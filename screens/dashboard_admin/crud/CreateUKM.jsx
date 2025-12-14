import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";

// ===== helper: base64 -> ArrayBuffer =====
const decodeBase64ToArrayBuffer = (base64) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const len = base64.length;
    const bufferLength = base64.length * 0.75;
    const arraybuffer = new ArrayBuffer(bufferLength);
    const bytes = new Uint8Array(arraybuffer);
    let p = 0;

    for (let i = 0; i < len; i += 4) {
        const encoded1 = chars.indexOf(base64[i]);
        const encoded2 = chars.indexOf(base64[i + 1]);
        const encoded3 = chars.indexOf(base64[i + 2]);
        const encoded4 = chars.indexOf(base64[i + 3]);

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        if (encoded3 !== 64) bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        if (encoded4 !== 64) bytes[p++] = ((encoded3 & 3) << 6) | encoded4;
    }

    return arraybuffer;
};

const CreateUKM = ({ navigation }) => {
    const [nama_ukm, setNamaUkm] = useState("");
    const [kepanjangan, setKepanjangan] = useState("");
    const [jumlah_anggota, setJumlahAnggota] = useState("");
    const [deskripsi_ukm, setDeskripsiUkm] = useState("");
    const [tempat_latihan, setTempatLatihan] = useState("");
    const [since, setSince] = useState(""); // contoh: 2025-12-13
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Format to YYYY-MM-DD for database
            const formatted = selectedDate.toISOString().split('T')[0];
            setSince(formatted);
        }
    };

    const [logoLocal, setLogoLocal] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const pickLogo = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Izin ditolak", "Aplikasi butuh akses galeri untuk pilih logo.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setLogoLocal(result.assets[0].uri);
        }
    };

    const uploadLogoToStorage = async (uri) => {
        if (!uri) return "";
        setUploading(true);
        try {
            // bucket kamu: logo_ukm (PUBLIC)
            // kalau policy butuh jpg + folder public, pakai ini:
            const fileName = `public/logo_ukm${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
            const arrayBuffer = decodeBase64ToArrayBuffer(base64);

            const { error: uploadError } = await supabase.storage
                .from("logo_ukm")
                .upload(fileName, arrayBuffer, {
                    contentType: "image/jpeg",
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("logo_ukm").getPublicUrl(fileName);
            return data?.publicUrl || "";
        } finally {
            setUploading(false);
        }
    };

    const validate = () => {
        const errors = [];
        if (!nama_ukm.trim()) errors.push("• Nama UKM wajib diisi");
        if (!kepanjangan.trim()) errors.push("• Kepanjangan wajib diisi");
        if (!jumlah_anggota.toString().trim()) errors.push("• Jumlah anggota wajib diisi");
        if (!deskripsi_ukm.trim()) errors.push("• Deskripsi wajib diisi");
        if (!tempat_latihan.trim()) errors.push("• Tempat latihan wajib diisi");
        if (!since.trim()) errors.push("• Since wajib diisi");
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validate();
        if (errors.length > 0) {
            Alert.alert("Gagal", errors.join("\n"));
            return;
        }

        setSaving(true);
        try {
            let logo_ukm = "";
            if (logoLocal) {
                logo_ukm = await uploadLogoToStorage(logoLocal);
            }

            const payload = {
                nama_ukm: nama_ukm.trim(),
                kepanjangan: kepanjangan.trim(),
                jumlah_anggota: Number(jumlah_anggota),
                deskripsi_ukm: deskripsi_ukm.trim(),
                tempat_latihan: tempat_latihan.trim(),
                since: since.trim(),
                logo_ukm,
            };

            const { error } = await supabase.from("tb_ukm").insert([payload]);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            Alert.alert("Berhasil", "Data UKM berhasil ditambahkan.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", err.message || "Terjadi kesalahan sistem");
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="TAMBAH UKM" />

            <ScrollView
                style={GlobalStyles.formContainer}
                contentContainerStyle={GlobalStyles.formContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrap}>
                    {/* LOGO */}
                    <Text style={GlobalStyles.formLabel}>Logo UKM</Text>
                    <View style={GlobalStyles.avatarBox}>
                        {logoLocal ? (
                            <Image source={{ uri: logoLocal }} style={GlobalStyles.avatarPreview} />
                        ) : (
                            <View style={GlobalStyles.avatarPlaceholder}>
                                <Text style={GlobalStyles.avatarPlaceholderText}>Belum ada logo</Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={GlobalStyles.secondaryBtn}
                            activeOpacity={0.85}
                            onPress={pickLogo}
                            disabled={saving || uploading}
                        >
                            <Text style={GlobalStyles.secondaryBtnText}>Pilih Logo</Text>
                        </TouchableOpacity>

                        {uploading ? (
                            <View style={GlobalStyles.uploadRow}>
                                <ActivityIndicator size="small" />
                                <Text style={GlobalStyles.uploadText}>Uploading...</Text>
                            </View>
                        ) : null}
                    </View>

                    {/* INPUT */}
                    <Text style={GlobalStyles.formLabel}>Nama UKM</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan nama UKM"
                        value={nama_ukm}
                        onChangeText={setNamaUkm}
                    />

                    <Text style={GlobalStyles.formLabel}>Kepanjangan</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan kepanjangan UKM"
                        value={kepanjangan}
                        onChangeText={setKepanjangan}
                    />

                    <Text style={GlobalStyles.formLabel}>Jumlah Anggota</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Contoh: 120"
                        value={jumlah_anggota}
                        onChangeText={setJumlahAnggota}
                        keyboardType="numeric"
                    />

                    <Text style={GlobalStyles.formLabel}>Deskripsi UKM</Text>
                    <TextInput
                        style={[GlobalStyles.formInput, { height: 110, textAlignVertical: "top" }]}
                        placeholder="Masukkan deskripsi"
                        value={deskripsi_ukm}
                        onChangeText={setDeskripsiUkm}
                        multiline
                    />

                    <Text style={GlobalStyles.formLabel}>Tempat Latihan</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan tempat latihan"
                        value={tempat_latihan}
                        onChangeText={setTempatLatihan}
                    />

                    <Text style={GlobalStyles.formLabel}>Since</Text>
                    <TouchableOpacity
                        style={[GlobalStyles.formInput, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}
                        activeOpacity={0.8}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ color: since ? "#000" : "#999" }}>
                            {since ? new Date(since).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }) : "Pilih Tanggal"}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={since ? new Date(since) : new Date()}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    <TouchableOpacity
                        style={GlobalStyles.primaryBtn}
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                        disabled={saving || uploading}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={GlobalStyles.primaryBtnText}>Simpan</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={GlobalStyles.cancelBtn}
                        activeOpacity={0.85}
                        onPress={() => navigation.goBack()}
                        disabled={saving || uploading}
                    >
                        <Text style={GlobalStyles.cancelBtnText}>Batal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavBotAdmin navigation={navigation} />
        </View>
    );
};

export default CreateUKM;
