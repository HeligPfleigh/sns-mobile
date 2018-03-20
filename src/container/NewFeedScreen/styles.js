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
    height: "40%",
    width: "90%",
    fontSize: 18,
    color: colors.SECONDARY,
  },
  postButton: {
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: "60%",
    right: "5%",
  },
  postButtonText: {
    color: colors.WHITE,
    fontSize: 16,
  },
  textLength: {
    fontSize: 18,
    color: colors.PRIMARY,
    position: "absolute",
    top: "45%",
    right: "10%",
  }
});

export default styles;
