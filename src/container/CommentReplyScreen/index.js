import React, { Component } from "react";
import { Header, Left, Button, Body, Title, Right } from "native-base";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Layout from "../../components/Layout";
import { colors } from "../../constants";
import AddCommentSection from "../../components/AddCommentSection";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  addCommentContainer: {
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
  },
});

@connect(
  null,
  dispatch => ({ dispatch })
)
class CommentReplyScreen extends Component {
  state = {
    top: "90%",
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    const { commentID, postID } = this.props.navigation.state.params;
    return (
      <Layout navigation={this.props.navigation}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <MaterialIcons name="arrow-back" size={20} color={colors.PRIMARY}/>
            </Button>
          </Left>
          <Body>
            <Title>Reply</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <View style={[styles.addCommentContainer, { top: this.state.top }]}>
            <AddCommentSection postId={postID} commentID={commentID}/>
          </View>
        </View>
      </Layout>
    );
  }
}

export default CommentReplyScreen;
