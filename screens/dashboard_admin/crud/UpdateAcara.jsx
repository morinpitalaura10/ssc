import React, { useCallback, useEffect, useState } from "react";
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

const UpdateAcara = ({ navigation, route }) => {
    const { id_acara } = route.params || {};

    // form state
    const [judul_acara, setJudulAcara] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tanggal, setTanggal] = useState(""); // input string
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Format to YYYY-MM-DD for database
            const formatted = selectedDate.toISOString().split('T')[0];
            setTanggal(formatted);
        }
    };

    // image state
    const [imageUri, setImageUri] = useState("");       // local picked image
    const [oldImageUrl, setOldImageUrl] = useState(""); // url from DB

    // loading
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!id_acara) {
            Alert.alert("Gagal", "id_acara tidak ditemukan.");
            setLoading(false);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from("tb_acara")
            .select("id_acara, judul_acara, deskripsi, tanggal, img_acara")
            .eq("id_acara", id_acara)
            .single();

        if (error) {
            Alert.alert("Gagal", error.message);
            setLoading(false);
            return;
        }

        setJudulAcara(data?.judul_acara || "");
        setDeskripsi(data?.deskripsi || "");
        // simpan string tanggal agar bisa diedit
        setTanggal(data?.tanggal ? String(data.tanggal) : "");
        setOldImageUrl(data?.img_acara || "");

        setLoading(false);
    }, [id_acara]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Izin ditolak", "Aplikasi butuh akses galeri untuk pilih foto.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    // ===== helper decode base64 -> ArrayBuffer (sama kayak punyamu)
    const decode = (base64) => {
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

    const uploadPosterToStorage = async (uri) => {
        setUploading(true);
        try {
            // bucket: img_acara
            // (kalau RLS storage kamu butuh "public/", pakai ini. Kalau tidak, hapus "public/")
            const fileName = `public/img_acara${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
            const arrayBuffer = decode(base64);

            const { error: uploadError } = await supabase.storage
                .from("img_acara")
                .upload(fileName, arrayBuffer, {
                    contentType: "image/jpeg",
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("img_acara").getPublicUrl(fileName);
            return data?.publicUrl || "";
        } finally {
            setUploading(false);
        }
    };

    const validate = () => {
        const errors = [];
        if (!judul_acara.trim()) errors.push("• Judul acara wajib diisi");
        if (!deskripsi.trim()) errors.push("• Deskripsi wajib diisi");
        if (!tanggal.trim()) errors.push("• Tanggal wajib diisi");
        return errors;
    };

    const handleUpdate = async () => {
        const errors = validate();
        if (errors.length > 0) {
            Alert.alert("Gagal", errors.join("\n"));
            return;
        }

        setSaving(true);
        try {
            // kalau pilih poster baru -> upload, kalau tidak -> pakai oldImageUrl
            let img_acara = oldImageUrl || "";
            if (imageUri) {
                img_acara = await uploadPosterToStorage(imageUri);
            }

            const payload = {
                judul_acara: judul_acara.trim(),
                deskripsi: deskripsi.trim(),
                tanggal: tanggal.trim(), // pastikan format valid utk DB kamu
                img_acara,
            };

            const { error } = await supabase
                .from("tb_acara")
                .update(payload)
                .eq("id_acara", id_acara);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            Alert.alert("Berhasil", "Data acara berhasil diperbarui.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (err) {
            Alert.alert("Error", err.message || "Terjadi kesalahan sistem");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="EDIT ACARA" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : (
                <ScrollView
                    style={GlobalStyles.formContainer}
                    contentContainerStyle={GlobalStyles.formContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={GlobalStyles.formWrap}>
                        {/* FOTO */}
                        <Text style={GlobalStyles.formLabel}>Poster Acara</Text>
                        <View style={GlobalStyles.avatarBox}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={GlobalStyles.avatarPreview} />
                            ) : oldImageUrl ? (
                                <Image source={{ uri: oldImageUrl }} style={GlobalStyles.avatarPreview} />
                            ) : (
                                <View style={GlobalStyles.avatarPlaceholder}>
                                    <Text style={GlobalStyles.avatarPlaceholderText}>Belum ada gambar</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={GlobalStyles.secondaryBtn}
                                activeOpacity={0.85}
                                onPress={pickImage}
                                disabled={saving || uploading}
                            >
                                <Text style={GlobalStyles.secondaryBtnText}>Pilih Gambar</Text>
                            </TouchableOpacity>

                            {uploading ? (
                                <View style={GlobalStyles.uploadRow}>
                                    <ActivityIndicator size="small" />
                                    <Text style={GlobalStyles.uploadText}>Uploading...</Text>
                                </View>
                            ) : null}
                        </View>

                        {/* INPUT */}
                        <Text style={GlobalStyles.formLabel}>Judul Acara</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Masukkan judul acara"
                            value={judul_acara}
                            onChangeText={setJudulAcara}
                        />

                        <Text style={GlobalStyles.formLabel}>Deskripsi</Text>
                        <TextInput
                            style={[GlobalStyles.formInput, { height: 110, textAlignVertical: "top" }]}
                            placeholder="Masukkan deskripsi acara"
                            value={deskripsi}
                            onChangeText={setDeskripsi}
                            multiline
                        />

                        <Text style={GlobalStyles.formLabel}>Tanggal</Text>
                        <TouchableOpacity
                            style={[GlobalStyles.formInput, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}
                            activeOpacity={0.8}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: tanggal ? "#000" : "#999" }}>
                                {tanggal ? new Date(tanggal).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric"
                                }) : "Pilih Tanggal"}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={tanggal ? new Date(tanggal) : new Date()}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}

                        {/* SUBMIT */}
                        <TouchableOpacity
                            style={GlobalStyles.primaryBtn}
                            activeOpacity={0.85}
                            onPress={handleUpdate}
                            disabled={saving || uploading}
                        >
                            {saving ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={GlobalStyles.primaryBtnText}>Simpan Perubahan</Text>
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
            )}

            <NavBotAdmin navigation={navigation} />
        </View>
    );
};

export default UpdateAcara;
