import React, { Component } from "react";
import ME_QUERY from "../graphql/queries/me";
import { graphql, compose, withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import { ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { counting } from "./action";
import * as utils from "./../utils/common";

class NotificationNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ""
    };
    setTimeout(() => {
      this.setState({
        number: this.props.userInfo.totalUnreadNotification
      });
      if (this.props) {
        this.props.dispatch(counting({ params: this.state.number }));
      }
    }, 2000);
  }

  render() {
    if (this.props.userInfo) {
      return <Text style={{ fontSize: 11, color: "white" }}>{this.props.counting.params}</Text>;
    }
    return <ActivityIndicator />;
  }
}

const NotificationNumberWithData = compose(
  connect(({ counting, userInfo }) => ({ counting, userInfo }),  dispatch => ({ dispatch })),
  withApollo,
  graphql(ME_QUERY)
)(NotificationNumber);
export default NotificationNumberWithData;
