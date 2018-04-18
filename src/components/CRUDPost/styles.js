import { StyleSheet } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  avatar: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 9,
    paddingTop: 5,
    alignItems: "center",
    position: "relative",
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  input: {
    width: "90%",
    fontSize: 18,
    color: colors.SECONDARY,
  },
  imageContainer: {
    height: "40%",
    width: "90%",
  },
  postButton: {
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    width: 80,
    height: 40,
  },
  postButtonText: {
    color: colors.WHITE,
    fontSize: 16,
  },
  textLength: {
    fontSize: 18,
    color: colors.PRIMARY,
  },
  bottomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    width: "100%",
    height: 50,
    zIndex: 2,
    bottom: 0,
  },
  mediaControlContainer: {
    flex: 1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  mediaButton: {
    marginHorizontal: 10,
  }
});

export default styles;
