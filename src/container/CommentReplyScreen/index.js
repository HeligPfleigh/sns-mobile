import React, { Component } from "react";
import { Header, Left, Button, Body, Title, Right } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Layout from "../../components/Layout";
import { colors } from "../../constants";

@connect(
  null,
  dispatch => ({ dispatch })
)
class CommentReplyScreen extends Component {
  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <Layout navigation={this.props.navigation}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <MaterialIcons name="arrow-back" size={20} color={colors.PRIMARY}/>
            </Button>
          </Left>
          <Body>
            <Title>Comment</Title>
          </Body>
          <Right />
        </Header>

      </Layout>
    );
  }
}

export default CommentReplyScreen;
