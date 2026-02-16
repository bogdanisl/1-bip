import { hexToRgba } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


export const createContactStyles = (themeColors: any) =>
StyleSheet.create({
    headerRow: { flexDirection: "row", marginLeft: 24, height: 30, paddingTop: 50 },
    section: { paddingLeft: 17 },
    sectionText: {
      color: themeColors.tint,
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      paddingRight: 80,
    },
    sectionDesc: {
      color: themeColors.text,
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      paddingRight: 80,
      paddingTop: 20,
    },
    profileWrapper: {
      padding: 24,
      marginTop: 40,
      alignItems: "center",
    },
    avatarContainer: {
      padding: 5,
      borderRadius: 70,
      backgroundColor: themeColors.background,
      borderColor: hexToRgba(themeColors.text, 0.15),
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: { width: 114, height: 114, borderRadius: 70 },
    row: { flexDirection: "row", padding: 24, justifyContent: "space-between" },
    leftColumn: { flex: 1, alignItems: "flex-end", marginRight: 20 },
    nameText: {
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginBottom: 11,
    },
    roleText: {
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginBottom: 20,
      textAlign: "right",
    },
    rightColumn: { flex: 1 },
    iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    iconText: {
      marginLeft: 8,
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 14,
    },
    consultContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    consultTitle: {
      fontSize: 20,
      height: 45,
      fontFamily: "Poppins-SemiBold",
      textAlign: "left",
    },
    consultDesc: {
      padding: 12,
      paddingRight: 44,
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
    },
    promoTextContainer: {
      padding: 20,
      paddingRight: 48,
      paddingBottom: 48,
    },
    promoText: {
      color: themeColors.text,
      fontFamily: "Poppins-Bold",
      fontSize: 24,
    },
    addressHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 16,
    },
    addressHeaderText: {
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 15,
    },
    imageRow: { flexDirection: "row", padding: 16 },
    image: {
      width: Dimensions.get('screen').width / 2 - 20,
      height: Dimensions.get('screen').width / 2 - 20,
      borderRadius: 8,
      marginRight: 16,
    },
    companyTextContainer: { flex: 1 },
    companyName: {
      fontSize: 20,
      height: 25,
      fontFamily: "Poppins-Bold",
    },
    companySub: {
      marginBottom: 4,

      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    companyAddress: {
      marginBottom: 4,
      marginTop: 12,
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    companyContact: {
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    contactRow: {
      flexDirection: "row",
      padding: 16,
      paddingBottom: 48,
    },
    contactColumn: { flex: 1 },
    openHoursColumn: {
      flex: 1,
      paddingBottom: Platform.OS === "ios" ? 100 : 200,
    },
    openText: {
      marginTop: -20,
      marginBottom: 20,
      width: "55%",
      textAlign: "center",
      paddingVertical: 4,
      borderRadius: 4,
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
    },
    hoursRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 8,
      borderBottomWidth: 1,
      paddingVertical: 2,
    },
    hourText: {
      fontFamily: "Poppins-SemiBold",
    },
    map: { width: '100%', height: '100%' },
  });