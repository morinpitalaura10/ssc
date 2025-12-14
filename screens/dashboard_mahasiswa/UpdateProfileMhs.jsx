import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

import { GlobalStyles } from "../../styles/GlobalStyles";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import CardBg from "../../components/molecules/CardBg";
import { supabase } from "../../utils/supabase";

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

const UpdateProfileMhs = ({ navigation, route }) => {
    const { id_user } = route.params || {};

    const JURUSAN_OPTIONS = [
        "Informatika",
        "MPI",
        "Matematika",
        "PAI",
        "PBA",
        "PGMI",
        "PIAUD",
        "PJJ PAI",
        "PJJ PBA",
        "PJJ PGMI",
        "TBINDO",
        "TBI",
        "TBIO",
        "TKIM",
        "TMTK",
    ];

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // foto
    const [imageUri, setImageUri] = useState("");       // local picked
    const [oldImageUrl, setOldImageUrl] = useState(""); // existing img_pp

    // form sesuai tb_user
    const [nama_lengkap, setNamaLengkap] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // opsional (kalau diisi, update)
    const [nope, setNope] = useState("");
    const [jurusan, setJurusan] = useState(JURUSAN_OPTIONS[0]);
    const [role, setRole] = useState(""); // biasanya ga perlu diedit mhs, tapi tetap ada di tabel

    const fetchProfile = useCallback(async () => {
        if (!id_user) {
            Alert.alert("Gagal", "ID user tidak ditemukan.");
            setLoading(false);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from("tb_user")
            .select("id_user, nama_lengkap, username, role, nope, jurusan, img_pp")
            .eq("id_user", id_user)
            .single();

        if (error) {
            Alert.alert("Gagal", error.message);
            setLoading(false);
            return;
        }

        setNamaLengkap(data?.nama_lengkap || "");
        setUsername(data?.username || "");
        setRole(data?.role || "");
        setNope(data?.nope || "");
        setJurusan(data?.jurusan || JURUSAN_OPTIONS[0]);
        setOldImageUrl(data?.img_pp || "");

        setLoading(false);
    }, [id_user]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

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

    const uploadAvatarToStorage = async (uri) => {
        if (!uri) return oldImageUrl || "";

        setUploading(true);
        try {
            // bucket: img_pp
            const fileName = `public/img_pp${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
            const arrayBuffer = decodeBase64ToArrayBuffer(base64);

            const { error: uploadError } = await supabase.storage
                .from("img_pp")
                .upload(fileName, arrayBuffer, {
                    contentType: "image/jpeg",
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("img_pp").getPublicUrl(fileName);
            return data?.publicUrl || "";
        } finally {
            setUploading(false);
        }
    };

    const validate = () => {
        const errors = [];
        if (!nama_lengkap.trim()) errors.push("• Nama lengkap wajib diisi");
        if (!username.trim()) errors.push("• Username wajib diisi");
        if (!nope.trim()) errors.push("• No HP wajib diisi");
        if (!jurusan) errors.push("• Jurusan wajib dipilih");
        return errors;
    };

    const handleUpdate = async () => {
        const errors = validate();
        if (errors.length > 0) {
            Alert.alert("Validasi", errors.join("\n"));
            return;
        }

        setSaving(true);
        try {
            const img_pp = imageUri ? await uploadAvatarToStorage(imageUri) : (oldImageUrl || "");

            const payload = {
                nama_lengkap: nama_lengkap.trim(),
                username: username.trim(),
                nope: nope.trim(),
                jurusan: jurusan,
                img_pp,
            };

            // role biasanya jangan diubah oleh mahasiswa, tapi kalau mau ikut tersimpan:
            // payload.role = role;

            // password hanya diupdate kalau diisi
            if (password.trim()) payload.password = password.trim();

            const { error } = await supabase
                .from("tb_user")
                .update(payload)
                .eq("id_user", id_user);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            Alert.alert("Berhasil", "Profil berhasil diperbarui.", [
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
            <HeaderPrimary title="EDIT PROFIL" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={GlobalStyles.scrollContainer}
                >
                    <CardBg>
                        {/* FOTO PROFIL: tidak menampilkan link */}
                        <Text style={GlobalStyles.formLabel}>Foto Profil</Text>
                        <View style={GlobalStyles.avatarBox}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={GlobalStyles.avatarPreview} />
                            ) : oldImageUrl ? (
                                <Image source={{ uri: oldImageUrl }} style={GlobalStyles.avatarPreview} />
                            ) : (
                                <View style={GlobalStyles.avatarPlaceholder}>
                                    <Text style={GlobalStyles.avatarPlaceholderText}>Belum ada foto</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={GlobalStyles.secondaryBtn}
                                activeOpacity={0.85}
                                onPress={pickImage}
                                disabled={saving || uploading}
                            >
                                <Text style={GlobalStyles.secondaryBtnText}>Pilih Foto</Text>
                            </TouchableOpacity>

                            {uploading ? (
                                <View style={GlobalStyles.uploadRow}>
                                    <ActivityIndicator size="small" />
                                    <Text style={GlobalStyles.uploadText}>Uploading...</Text>
                                </View>
                            ) : null}
                        </View>

                        <Text style={GlobalStyles.formLabel}>Nama Lengkap</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Masukkan nama lengkap"
                            value={nama_lengkap}
                            onChangeText={setNamaLengkap}
                        />

                        <Text style={GlobalStyles.formLabel}>Username</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Masukkan username"
                            value={username}
                            autoCapitalize="none"
                            onChangeText={setUsername}
                        />

                        <Text style={GlobalStyles.formLabel}>Password (opsional)</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Isi jika ingin ganti password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={GlobalStyles.formLabel}>No. HP</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Masukkan nomor HP"
                            value={nope}
                            onChangeText={setNope}
                            keyboardType="phone-pad"
                        />

                        <Text style={GlobalStyles.formLabel}>Jurusan</Text>
                        <View style={GlobalStyles.pickerWrap}>
                            <Picker selectedValue={jurusan} onValueChange={setJurusan} style={GlobalStyles.picker}>
                                {JURUSAN_OPTIONS.map((opt) => (
                                    <Picker.Item key={opt} label={opt} value={opt} />
                                ))}
                            </Picker>
                        </View>

                        {/* role kalau mau ditampilkan read-only di edit */}
                        {!!role ? (
                            <>
                                <Text style={GlobalStyles.formLabel}>Role</Text>
                                <View style={GlobalStyles.readFieldBox}>
                                    <Text style={GlobalStyles.readFieldValue}>{role}</Text>
                                </View>
                            </>
                        ) : null}

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
                    </CardBg>
                </ScrollView>
            )}

            <NavBotMhs navigation={navigation} />
        </View>
    );
};

export default UpdateProfileMhs;
