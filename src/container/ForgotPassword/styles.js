import { StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  btnSummit: {
    width: "80%",
    height: 40,
    margin: 10,
    alignItems: "center",
    alignSelf: "center"
  },
  modal: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 20,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    justifyContent: "space-between"
  },
  heightmodalLandscape: {
    height: responsiveHeight(45)
  },
  heightmodalPotrait: {
    height: responsiveHeight(45)
  },
  textBtnSummit: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: responsiveWidth(4.5)
  },
  textHeaderModal: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  }
});

export default styles;
