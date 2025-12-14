import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import HeaderPrimary from "../../components/atom/HeaderPrimary";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { supabase } from "../../utils/supabase";

const Pendaftaran = ({ navigation }) => {
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

    const SEMESTER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const [nim, setNim] = useState("");
    const [nama_lengkap, setNamaLengkap] = useState("");
    const [jurusan, setJurusan] = useState(JURUSAN_OPTIONS[0]);
    const [semester, setSemester] = useState(SEMESTER_OPTIONS[0]);
    const [alasan, setAlasan] = useState("");
    const [saving, setSaving] = useState(false);

    const validate = useMemo(() => {
        const errors = [];
        if (!nim.trim()) errors.push("• NIM wajib diisi");
        if (!nama_lengkap.trim()) errors.push("• Nama lengkap wajib diisi");
        if (!jurusan) errors.push("• Jurusan wajib dipilih");
        if (!semester) errors.push("• Semester wajib dipilih");
        if (!alasan.trim()) errors.push("• Alasan wajib diisi");
        return errors;
    }, [nim, nama_lengkap, jurusan, semester, alasan]);

    const handleSubmit = async () => {
        if (validate.length > 0) {
            Alert.alert("Wajib diisi", validate.join("\n"));
            return;
        }

        setSaving(true);
        try {
            const payload = {
                nim: Number(nim),
                nama_lengkap: nama_lengkap.trim(),
                jurusan,   // ✅ dropdown
                semester,  // ✅ dropdown
                alasan: alasan.trim(),
            };

            const { error } = await supabase.from("tb_daftarkegiatan").insert([payload]);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            Alert.alert("Berhasil", "Pendaftaran berhasil dikirim.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (e) {
            Alert.alert("Error", e?.message || "Terjadi kesalahan sistem");
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="PENDAFTARAN" />

            <ScrollView
                style={GlobalStyles.formContainer}
                contentContainerStyle={GlobalStyles.formContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrap}>
                    <Text style={GlobalStyles.formLabel}>NIM</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan NIM"
                        value={nim}
                        onChangeText={setNim}
                        keyboardType="numeric"
                    />

                    <Text style={GlobalStyles.formLabel}>Nama Lengkap</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan nama lengkap"
                        value={nama_lengkap}
                        onChangeText={setNamaLengkap}
                    />

                    <Text style={GlobalStyles.formLabel}>Jurusan</Text>
                    <View style={GlobalStyles.pickerWrap}>
                        <Picker
                            selectedValue={jurusan}
                            onValueChange={(v) => setJurusan(v)}
                            style={GlobalStyles.picker}
                        >
                            {JURUSAN_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={GlobalStyles.formLabel}>Semester</Text>
                    <View style={GlobalStyles.pickerWrap}>
                        <Picker
                            selectedValue={semester}
                            onValueChange={(v) => setSemester(v)}
                            style={GlobalStyles.picker}
                        >
                            {SEMESTER_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={`Semester ${opt}`} value={opt} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={GlobalStyles.formLabel}>Alasan</Text>
                    <TextInput
                        style={[GlobalStyles.formInput, { height: 110, textAlignVertical: "top" }]}
                        placeholder="Tulis alasan kamu"
                        value={alasan}
                        onChangeText={setAlasan}
                        multiline
                    />

                    <TouchableOpacity
                        style={GlobalStyles.primaryBtn}
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={GlobalStyles.primaryBtnText}>Daftar Sekarang</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={GlobalStyles.cancelBtn}
                        activeOpacity={0.85}
                        onPress={() => navigation.goBack()}
                        disabled={saving}
                    >
                        <Text style={GlobalStyles.cancelBtnText}>Batal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavBotPublic navigation={navigation} />
        </View>
    );
};

export default Pendaftaran;
