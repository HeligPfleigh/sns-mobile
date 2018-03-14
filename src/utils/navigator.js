import React, { Component } from "react";
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";
import { AppNavigator } from "./routes";


const navReducer = (state, action) => {
  let nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export const createNavReducer = () => {
  return {
    nav: navReducer
  };
};

export class App extends Component {
  render() {
    const { dispatch, nav } = this.props;

    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export const AppWithNavigationState = connect(mapStateToProps)(App);
