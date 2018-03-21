import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Header, Left, Button, Body, Title, Right } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import Layout from "../../components/Layout";
import { colors } from "../../constants";
import GET_POST_QUERY from "../../graphql/queries/post";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

@compose(
  connect(
    ({ common, nav }) => ({
      nav: nav,
      orientation: common.orientation
    }),
    dispatch => ({ dispatch })
  ),
  graphql(GET_POST_QUERY, {
    options: (ownProps) => {
      return {
        variables: {
          _id: ownProps.navigation.state.params.postID
        }
      };
    }
  })
)
class PostDetailContainer extends Component {
  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <Layout>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <MaterialIcons name="arrow-back" size={20} color="blue"/>
            </Button>
          </Left>
          <Body>
            <Title>Bài viết</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView style={styles.container} />
      </Layout>
    );
  }
}

export default PostDetailContainer;
