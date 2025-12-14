import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import CardBg from "../../../components/molecules/CardBg";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";

const ReadAcara = ({ navigation, route }) => {
    const { id_acara } = route.params || {};

    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const formatTanggal = (value) => {
        if (!value) return "-";
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return String(value);
        return d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");

        if (!id_acara) {
            setErrorMsg("ID acara tidak ditemukan.");
            setRow(null);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("tb_acara")
            .select("id_acara, judul_acara, deskripsi, tanggal, created_at, img_acara")
            .eq("id_acara", id_acara)
            .single();

        if (error) {
            setErrorMsg(error.message);
            setRow(null);
        } else {
            setRow(data);
        }

        setLoading(false);
    }, [id_acara]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const Poster = () => {
        if (
            row?.img_acara &&
            typeof row.img_acara === "string" &&
            row.img_acara.startsWith("http")
        ) {
            return <Image source={{ uri: row.img_acara }} style={GlobalStyles.readAvatar} />;
        }
        return (
            <View style={GlobalStyles.readAvatarFallback}>
                <Ionicons name="calendar" size={38} color={Colors.primary} />
            </View>
        );
    };

    const ReadField = ({ label, value }) => (
        <View style={GlobalStyles.readFieldWrap}>
            <Text style={GlobalStyles.readFieldLabel}>{label}</Text>
            <View style={GlobalStyles.readFieldBox}>
                <Text style={GlobalStyles.readFieldValue}>{value || "-"}</Text>
            </View>
        </View>
    );

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="DETAIL ACARA" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : errorMsg ? (
                <View style={GlobalStyles.emptyWrap}>
                    <Ionicons name="alert-circle-outline" size={42} color={Colors.primary} />
                    <Text style={GlobalStyles.emptyText}>Gagal memuat data</Text>
                    <Text style={GlobalStyles.emptySubText}>{errorMsg}</Text>

                    <TouchableOpacity
                        style={GlobalStyles.primaryBtn}
                        onPress={fetchDetail}
                        activeOpacity={0.85}
                    >
                        <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={GlobalStyles.readScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <CardBg>
                        <View style={GlobalStyles.readAvatarWrap}>
                            <Poster />
                        </View>

                        <ReadField label="ID Acara" value={String(row?.id_acara ?? "")} />
                        <ReadField label="Judul Acara" value={row?.judul_acara} />
                        <ReadField label="Tanggal" value={formatTanggal(row?.tanggal)} />
                        <ReadField label="Deskripsi" value={row?.deskripsi} />

                        <View style={GlobalStyles.readActionsRow}>
                            <TouchableOpacity
                                style={GlobalStyles.readBackBtn}
                                activeOpacity={0.85}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={GlobalStyles.readBackBtnText}>Kembali</Text>
                            </TouchableOpacity>
                        </View>
                    </CardBg>
                </ScrollView>
            )}

            <NavBotAdmin navigation={navigation} />
        </View>
    );
};

export default ReadAcara;
