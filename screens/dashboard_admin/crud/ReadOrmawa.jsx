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

const ReadOrmawa = ({ navigation, route }) => {
    const { id_ormawa } = route.params || {};

    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");

        if (!id_ormawa) {
            setErrorMsg("ID ormawa tidak ditemukan.");
            setRow(null);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("tb_ormawa")
            .select(
                "id_ormawa, nama_ormawa, kepanjangan, nama_ketum, jumlah_anggota, total_depart, deskripsi_ormawa, logo_ormawa, since"
            )
            .eq("id_ormawa", id_ormawa)
            .single();

        if (error) {
            setErrorMsg(error.message);
            setRow(null);
        } else {
            setRow(data);
        }

        setLoading(false);
    }, [id_ormawa]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const Avatar = () => {
        if (row?.logo_ormawa && typeof row.logo_ormawa === "string" && row.logo_ormawa.startsWith("http")) {
            return <Image source={{ uri: row.logo_ormawa }} style={GlobalStyles.readAvatar} />;
        }
        return (
            <View style={GlobalStyles.readAvatarFallback}>
                <Ionicons name="people" size={38} color={Colors.primary} />
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
            <HeaderPrimary title="DETAIL ORMAWA" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : errorMsg ? (
                <View style={GlobalStyles.emptyWrap}>
                    <Ionicons name="alert-circle-outline" size={42} color={Colors.primary} />
                    <Text style={GlobalStyles.emptyText}>Gagal memuat data</Text>
                    <Text style={GlobalStyles.emptySubText}>{errorMsg}</Text>

                    <TouchableOpacity style={GlobalStyles.primaryBtn} onPress={fetchDetail} activeOpacity={0.85}>
                        <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={GlobalStyles.readScrollContent} showsVerticalScrollIndicator={false}>
                    <CardBg>
                        <View style={GlobalStyles.readAvatarWrap}>
                            <Avatar />
                        </View>

                        <ReadField label="ID Ormawa" value={String(row?.id_ormawa ?? "")} />
                        <ReadField label="Nama Ormawa" value={row?.nama_ormawa} />
                        <ReadField label="Kepanjangan" value={row?.kepanjangan} />
                        <ReadField label="Nama Ketum" value={row?.nama_ketum} />
                        <ReadField label="Jumlah Anggota" value={row?.jumlah_anggota != null ? String(row.jumlah_anggota) : "-"} />
                        <ReadField label="Total Depart" value={row?.total_depart != null ? String(row.total_depart) : "-"} />
                        <ReadField label="Since" value={row?.since ? String(row.since) : "-"} />
                        <ReadField label="Deskripsi" value={row?.deskripsi_ormawa} />

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

export default ReadOrmawa;
