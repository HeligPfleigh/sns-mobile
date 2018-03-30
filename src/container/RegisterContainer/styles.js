import { StyleSheet } from "react-native";

import { colors } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
  },
  header: {
    justifyContent: "center",
    paddingHorizontal: 30,
    height: "20%",
    width: "100%",
    backgroundColor: colors.PRIMARY,
  },
  headerText: {
    color: colors.WHITE,
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  tipContainer:{
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  tipText:{
    color: colors.PRIMARY,
    fontSize: 14,
    fontStyle: "italic",
  },
  label: {
    color: colors.PRIMARY,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: 20,
    color: colors.PRIMARY,
    fontWeight: "500",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: 50,
    zIndex: 2,
    bottom: 0,
  },
  backContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    padding: 20,
    backgroundColor: colors.LIGHT_GRAY,
  },
  nextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    padding: 20,
    backgroundColor: colors.PRIMARY,
  },
  errorText: {
    color: colors.PRIMARY,
    fontSize: 14,
    padding: 15,
    fontStyle: "italic",
  },
  verifyButton: {
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    borderRadius: 20,
  },
  verifyButtonText: {
    color: colors.WHITE,
    fontSize: 14,
  },
  verifyInputContainer: {
    flex: 3,
    borderWidth: 1,
    margin: 10,
    borderColor: colors.PRIMARY,
  },
});
