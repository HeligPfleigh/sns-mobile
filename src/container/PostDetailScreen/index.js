import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Keyboard } from "react-native";
import { Header, Left, Button, Body, Title, Right } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import { colors } from "../../constants";
import GET_POST_QUERY from "../../graphql/queries/post";
import Post from "../../components/Post";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
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
          _id: ownProps.navigation.state.params.postID,
          limit: ownProps.navigation.state.params.limit + 20,
        }
      };
    }
  })
)
class PostDetailContainer extends Component {

  _handlePressBack = () => {
    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    let content;
    if ( this.props.data.loading ){
      content = <ActivityIndicator size="large"/>;
    }
    else {
      const { post } = this.props.data;
      content = <Post post={post} />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <MaterialIcons name="arrow-back" size={20} color={colors.PRIMARY}/>
            </Button>
          </Left>
          <Body>
            <Title>Post</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          { content }
        </View>
      </View>
    );
  }
}

export default PostDetailContainer;
