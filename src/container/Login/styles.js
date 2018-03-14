import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: "40%",
    paddingTop: "18%",
    borderBottomWidth: 0,
    backgroundColor: "transparent"
  },

  headerLandscape: {
    height: "5%",
    paddingTop: "10%",
    paddingBottom: "5%",
    borderBottomWidth: 0,
    backgroundColor: "transparent"
  },

  logo: {
    width: 70,
    height: 70,
    marginRight: 10
  },

  btnLoginWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  btnLogin: {
    width: "80%"
  },

  footerWrapper: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0
  },

  footerContent: {
    opacity: 0.5,
    flexDirection: "row",
    alignItems: "center"
  },

  orWrapper: {
    width: "90%",
    marginVertical: 10,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  orDivider: {
    height: 1,
    width: "100%",
    flex: 1,
    backgroundColor: "#E4E4E4",
  },

  orTextWrapper: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  orText: {
    color: "#fff"
  }
});

export default styles;
