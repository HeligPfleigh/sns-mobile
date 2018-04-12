import React, { Component } from "react";
import ME_QUERY from "../graphql/queries/me";
import { graphql, compose, withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import { ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { counting } from "./action";

class NotificationNumber extends Component {
  constructor(props) {
    super(props);
    if (!this.props.data.me){
      this.state = {
        notiCount: 0
      };
    }



    if (this.props.data.me) {
      this.props.dispatch(counting({params: this.state.notiCount}));
    }


  }
  render() {
    console.log(this.props);
    if (this.props.data.me) {
      return <Text style={{ fontSize: 11, color: "white" }}> {this.state.notiCount === null ? <ActivityIndicator/> : this.state.notiCount} </Text>;
    }
    return <ActivityIndicator />;
  }
}

const NotificationNumberWithData = compose( connect(
  dispatch => ({ dispatch })
), withApollo ,graphql(ME_QUERY))(NotificationNumber);
export default NotificationNumberWithData;
