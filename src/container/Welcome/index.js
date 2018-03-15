import React from "react";
import { StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import SplashScreen from "react-native-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

import { isAuthenticate } from "../../utils/auth";

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../../assets/images/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../../assets/images/2.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../../assets/images/3.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  }
];

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    if (isAuthenticate()) {
      props.navigation.navigate("Drawer");
    }
  }

  _onDone = () => this.props.navigation.navigate("Login")

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
    }, 3000);
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
      />
    );
  }
}
