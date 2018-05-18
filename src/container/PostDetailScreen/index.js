import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Keyboard } from "react-native";
import { Header, Left, Button, Body, Title, Right, Text, Icon } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";
import { isEmpty } from "lodash";

import { colors } from "../../constants";
import GET_POST_QUERY from "../../graphql/queries/post";
import COMMENT_ADDED_SUBSCRIPTION from "../../graphql/subscriptions/commentAdded";
import Post from "../../components/Post";
import update from "immutability-helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  postIsRemovedContainer: {
    flex: 1,
    alignItems: "center",
  },
  postIsRemovedText:{
    color: colors.PRIMARY,
    fontSize: 14,
    padding: 20,
  },
});

const postIsRemovedText = "Oop! Bài viết này đã bị xoá hoặc không còn khả dụng";

@compose(
  connect(
    ({ common, nav }) => ({
      nav: nav,
      orientation: common.orientation
    }),
    dispatch => ({ dispatch })
  ),
  graphql(GET_POST_QUERY, {
    options: ownProps => {
      return {
        variables: {
          _id: ownProps.navigation.state.params.postID,
          limit: ownProps.navigation.state.params.limit + 20
        }
      };
    }
  })
)
class PostDetailContainer extends Component {

  componentDidMount() {
    this.props.data.subscribeToMore({
      document: COMMENT_ADDED_SUBSCRIPTION,
      variables: {
        postID: this.props.navigation.state.params.postID,
        commentID: null,
      },
      updateQuery: (prev, { subscriptionData }) => {

        let newComments = [subscriptionData.data.commentAdded, ...prev.post.comments];
        let newTotalComments = prev.post.totalComments + 1;

        return update(prev, { post: {
          author: { $set: prev.post.author },
          building: { $set: prev.post.building },
          comments: { $set: newComments },
          createdAt: { $set: prev.post.createdAt },
          isLiked: { $set: prev.post.isLiked },
          message: { $set: prev.post.message },
          messagePlainText: { $set: prev.post.messagePlainText },
          totalComments: { $set: newTotalComments },
          totalLikes: { $set : prev.post.totalLikes },
          user: { $set: prev.post.user },
        }});
      }
    });
  }

  _handlePressBack = () => {
    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    let content;
    if ( this.props.data.loading ){
      content = <ActivityIndicator size="large" style={{marginTop:200}}/>;
    }
    else {
      const { post } = this.props.data;
      if ( !isEmpty(post) ){
        content = <Post post={post} />;
      }
      else {
        content =
          <View style={styles.postIsRemovedContainer}>
            <Text style={styles.postIsRemovedText}>
              {postIsRemovedText}
            </Text>
          </View>;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <Icon type="MaterialIcons" name="arrow-back" style={{ fontSize: 20, color: colors.PRIMARY }} />
            </Button>
          </Left>
          <Body>
            <Title>Post</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>{content}</View>
      </View>
    );
  }
}

export default PostDetailContainer;
