import React from "react";
import { connect } from "react-redux";
import { View } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import SplashScreen from "react-native-splash-screen";

import * as utils from "../../utils/common";
import { isAuthenticate } from "../../utils/auth";
import { SPINNER_CHANGE } from "../../constants";
import styles from "./styles";

@connect(null, dispatch => ({ dispatch }))
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    if (props.dispatch) {
      props.dispatch(utils.createAction(SPINNER_CHANGE, true));
    }
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const isLogged = await isAuthenticate();
    this.props.navigation.navigate(isLogged ? "App" : "Auth");
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={false} textStyle={{ color: "#FFF" }} />
      </View>
    );
  }
}

export default AuthLoadingScreen;
