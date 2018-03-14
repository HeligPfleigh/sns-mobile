import { StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  btnSummit: {
    width: "80%",
    height: 40,
    margin: 10,
    alignItems: "center",
    alignSelf: "center"
  },
  btnChangeAvatar: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    height: 15
  },
  modal: {
    width: "85%",
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
  textBtnChangeAvatar: {
    color: "#fff",
    fontSize: responsiveWidth(4)
  },
  textHeaderModal: {
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  }
});

export default styles;
