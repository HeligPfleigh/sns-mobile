import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityIndicator, Text } from "react-native";
import { Icon } from "native-base";
import IconBadge from "react-native-icon-badge";
import { graphql, compose, withApollo } from "react-apollo";

import { counting } from "./action";
import ME_QUERY from "../graphql/queries/me";

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

  componentWillUnmount() {
    clearTimeout(this._interval);
  }

  render() {
    const { iconName, data: { loading, me } } = this.props;

    if (loading) {
      return <ActivityIndicator />;
    }

    if (me && me.totalUnreadNotification > 0) {
      return (
        <IconBadge
          MainElement={<Icon name={iconName || "home"} style={{ fontSize: 29 }} />}
          BadgeElement={<Text style={{ fontSize: 11, color: "white" }}> {me.totalUnreadNotification} </Text>}
        />
      );
    } else {
      return <Icon name={iconName} style={{ fontSize: 29 }} />;
    }
  }
}

const NotificationNumberWithData = compose(
  connect(({ userInfo }) => ({ userInfo }), dispatch => ({ dispatch })),
  withApollo,
  graphql(ME_QUERY)
)(NotificationNumber);
export default NotificationNumberWithData;
