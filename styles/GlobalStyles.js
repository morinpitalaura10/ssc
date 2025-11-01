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
    shadowOpacity: 2,
    shadowRadius: 4,
    marginBottom: 15,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
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

});
