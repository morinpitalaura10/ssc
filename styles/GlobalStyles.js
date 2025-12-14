// styles/GlobalStyles.js
import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#800000",
  secondary: "#B22222",
  accent: "#FFD700",
  background: "#FFF8F8",
  textPrimary: "#020202",
  textSecondary: "#404040",
  white: "#FFFFFF",
  grayLight: "#EDEDED",
  bgLight: "#FEFCFC",
  bgcard: "#f8dfdfff",
  danger: "#D9534F",
  shadow: "#00000040",
};

// =================================================================
// 💠 GLOBAL STYLES
// =================================================================
export const GlobalStyles = StyleSheet.create({
  // ====== LAYOUT ======
  container: {
    flex: 1,
    backgroundColor: Colors.bgLight,
    paddingBottom: 70,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  // ====== HEADER ======
  headerPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 1,
  },
  headerTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },

  // ====== BANNER / PUBLIC ======
  bannerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  bannerImage: {
    width: "100%",
    height: 160,
    borderRadius: 15,
  },
  bannerText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },

  // ====== CARD HOME ======
  cardHome: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  cardText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
    textAlign: "justify",
  },

  // ====== CARD DENGAN IMAGE ======
  cardHomeWithImage: {
    backgroundColor: Colors.bgcard,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOpacity: 20,
    shadowRadius: 4,
    marginBottom: 15,
  },
  cardImage2: {
    width: "100%",
    height: 320,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardImage: {
    width: "150%",
    height: 260,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
    backgroundColor: Colors.bgcard,
  },

  // ====== ABOUT / LOGIN ======
  aboutBanner: {
    alignItems: "center",
    marginBottom: 10,
  },
  aboutLogo: {
    width: 100,
    height: 100,
  },
  loginLogoBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginLogo: {
    width: 110,
    height: 110,
  },

  // ====== INPUT & FORM ======
  inputBox: {
    borderWidth: 1,
    borderColor: "#e4bebeff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: "#fcf6f6ff",
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formField: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  textLabel: {
    fontSize: 16,
    color: "#020202", // atau pakai Colors.textPrimary
    fontWeight: "600",
    marginBottom: 6,
  },
  uploadSection: {
    marginTop: 10,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  uploadBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  uploadBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },

  // ====== BUTTON ======
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    elevation: 2,
    marginTop: 15,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  // ====== PROFILE & DETAIL ======
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 10,
  },
  profileField: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 6,
  },
  fieldBox: {
    backgroundColor: Colors.bgcard,
    borderWidth: 1,
    borderColor: "#d8b6b6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
  },
  fieldValue: {
    fontSize: 15,
    color: Colors.textPrimary,
  },

  // ====== CRUD ======
  crudIconBox: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  crudLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  // ====== NAV BOTTOM ======
  navBot: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: "600",
  },

  // ====== SNACKBAR ======
  snackbar: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 30,
    opacity: 0.9,
  },
  snackbarText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  // ====== DASHBOARD ADMIN ======
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  cardAdminContent: {
    padding: 14,
  },
  cardAdminTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  cardAdminDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  //=====BATIK=====
  centeredImageContainer: {
    alignItems: "center",
    marginVertical: 15,
  },

  detailImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 5,
    textAlign: "center",
  },

  itemSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
    textAlign: "center",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  // ===== CRUD MAHASISWA LIST =====
  stickyTopBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "800",
  },
  errorText: {
    marginTop: 10,
    color: Colors.danger,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  centerContent: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  mhsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  mhsAvatar: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 30,
    marginLeft: 30,
  },
  mhsAvatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  mhsInfo: {
    flex: 1,
  },
  mhsName: {
    fontSize: 18,
    fontWeight: "700",
  },
  mhsMeta: {
    marginTop: 2,
    color: "#666",
  },
  mhsActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  mhsActionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mhsActionText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  mhsDeleteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f2c0c0",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mhsDeleteText: {
    color: Colors.danger,
    fontWeight: "700",
  },

  listContainerEmpty: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  emptyText: {
    marginTop: 8,
    fontWeight: "700",
    color: "#666",
  },

  // ===== FORM (ADD MAHASISWA) =====
  formContainer: { flex: 1 },
  formContent: { paddingBottom: 140 },

  formWrap: {
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  pickerLoading: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  pickerLoadingText: {
    color: "#666",
    fontWeight: "700",
  },

  formLabel: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "700",
    color: "#333",
  },

  formInput: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  pickerWrap: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },

  avatarBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  avatarPreview: {
    width: "100%",
    height: 180,
    borderRadius: 14,
  },
  avatarPlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    color: "#777",
    fontWeight: "700",
  },

  secondaryBtn: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryBtnText: {
    fontWeight: "800",
    color: "#333",
  },

  uploadRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadText: {
    color: "#666",
    fontWeight: "700",
  },

  primaryBtn: {
    marginTop: 18,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "900",
  },

  cancelBtn: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  cancelBtnText: {
    fontWeight: "900",
    color: "#333",
  },

  // ===== FORM PAGE (like dosen) =====
  formPageContent: {
    padding: 20,
    paddingBottom: 120,
  },

  previewCenterWrap: {
    alignItems: "center",
    marginBottom: 15,
  },

  previewAvatar: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },

  helperTextUpload: {
    fontSize: 10,
    color: "#aaa",
    fontStyle: "italic",
    marginBottom: 10,
    marginTop: -5,
  },

  btnPrimaryTopSpace: {
    marginTop: 20,
  },

  btnPrimaryLoading: {
    opacity: 0.7,
  },
  // ===== READ/DETAIL MAHASISWA =====
  detailContent: {
    padding: 16,
    paddingBottom: 130,
  },

  detailCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },

  detailAvatar: {
    width: 90,
    height: 90,
    borderRadius: 10, // kotak sedikit rounded
    marginRight: 12,
  },

  detailAvatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  detailInfo: {
    flex: 1,
  },

  detailName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  detailMeta: {
    marginTop: 2,
    color: "#666",
    fontWeight: "600",
  },

  detailDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  detailLine: {
    color: "#333",
    marginBottom: 6,
  },

  detailLabel: {
    fontWeight: "800",
    color: "#111",
  },

  detailActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  // ===== READ MAHASISWA (Profil-style) =====
  readScrollContent: {
    paddingHorizontal: 12,   // ✅ lebih mepet ke sisi
    paddingTop: 16,
    paddingBottom: 120,
  },

  readAvatarWrap: {
    alignItems: "center",
    marginBottom: 14,
  },

  readAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },

  readAvatarFallback: {
    width: 100,              // ✅ samain ukuran dengan readAvatar
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  readFieldWrap: {
    marginBottom: 10,
  },

  readFieldLabel: {
    fontSize: 13,           // ✅ biar mirip form label
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 6,
  },

  readFieldBox: {
    backgroundColor: "#f8dede",
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#f0caca",
  },

  readFieldValue: {
    color: "#333",
    fontWeight: "700",
  },

  readActionsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },

  // ✅ tombol kembali khusus (lebih enak dilihat)
  readBackBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  readBackBtnText: {
    fontWeight: "800",
    color: Colors.primary,
  },

  // ===== READ BUTTON (biar keren & ga jelek) =====
  readBackBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  readBackBtnText: {
    color: "#fff",
    fontWeight: "800",
  },

  // ===== CARD biar ga terlalu minggir (kalau CardBg kamu belum rapi) =====
  // pastiin CardBg wrapper-nya ga nempel kiri/kanan
  cardSectionTitle: {
    marginBottom: 12,
  },




});
