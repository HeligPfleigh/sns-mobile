import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Ionicons from "react-native-vector-icons/Ionicons";

import slides from "./data";
import * as utils from "../../utils/common";
import { SPINNER_CHANGE } from "../../constants";
import styles from "./styles";

@connect(null, dispatch => ({ dispatch }))
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    if (props.dispatch) {
      props.dispatch(utils.createAction(SPINNER_CHANGE, false));
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
