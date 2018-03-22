import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFAFA"
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10
  },
  header: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 10
  },
  infoTextContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  infoText: {
    fontSize: 16,
    backgroundColor: "transparent"
  }
});

export default styles;
