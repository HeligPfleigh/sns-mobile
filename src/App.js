// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Root } from "native-base";
import { connect } from "react-redux";
import Orientation from "react-native-orientation";
import Spinner from "react-native-loading-spinner-overlay";

import { AppWithNavigationState } from "./utils/navigator";
import { orientationDidChange } from "./reducers/common";

@connect(
  ({ common }) => ({
    isShowSpinner: common.isShowSpinner
  }),
  dispatch => ({
    dispatch,
    orientationDidChange: mode => dispatch(orientationDidChange(mode))
  })
)
class MainContainer extends Component {
  componentDidMount() {
    Orientation.addOrientationListener(this.props.orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.props.orientationDidChange);
  }

  render() {
    const { isShowSpinner } = this.props;
    return (
      <Root>
        <AppWithNavigationState />
        <Spinner visible={isShowSpinner || false} textStyle={{ color: "#FFF" }} />
      </Root>
    );
  }
}

MainContainer.propTypes = {
  isShowSpinner: PropTypes.bool,
  orientationDidChange: PropTypes.func
};

export default MainContainer;
