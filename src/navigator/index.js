import React, { Component } from "react";
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import Routers from "./routes";

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav);
const addListener = createReduxBoundAddListener("root");

@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends Component {
  render() {
    const { dispatch, nav } = this.props;
    return <Routers navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />;
  }
}

export default AppWithNavigationState;
