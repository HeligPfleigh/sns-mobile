import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { StyleProvider } from "native-base";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import getTheme from "./src/theme/components";
import variables from "./src/theme/variables/platform";
import { client, store } from "./src/store";
import MainContainer from "./src/App";

class Root extends Component {
  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <MainContainer />
          </ApolloProvider>
        </Provider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent("SNS", () => Root);
