import React, { Component } from "react";
import ME_QUERY from "../graphql/queries/me";
import { graphql, compose, withApollo } from "react-apollo";
import { ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { counting } from "./action";


class NotificationNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ""
    };
    this._interval = setTimeout(() => {
      this.setState({
        number: this.props.userInfo.totalUnreadNotification
      });
      if (this.props) {
        this.props.dispatch(counting({ params: this.state.number }));
      }
    }, 2000);
  }

  componentWillUnmount(){
    clearTimeout(this._interval);
  }

  render() {
    if (this.props.data.me) {
      return <Text style={{ fontSize: 11, color: "white" }}> {this.props.data.me.totalUnreadNotification} </Text>;
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
