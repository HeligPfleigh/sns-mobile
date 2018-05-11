import React, { Component } from "react";
import { Header, Left, Button, Body, Title, Right, Icon } from "native-base";
import { View, StyleSheet, ActivityIndicator, FlatList, Keyboard, Platform } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import { colors } from "../../constants";
import AddCommentSection from "../../components/AddCommentSection";
import GET_COMMENT_QUERY from "../../graphql/queries/comment";
import FeedComments from "../../components/FeedCard/FeedComments";
import COMMENT_ADDED_SUBSCRIPTION from "../../graphql/subscriptions/commentAdded";
import update from "immutability-helper";

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
  commentContainer: {
    height: "90%",
    alignSelf: "stretch",
  },
});

@compose(
  connect(
    null,
    dispatch => ({ dispatch })
  ),
  graphql(GET_COMMENT_QUERY, {
    options: (ownProps) => {
      return {
        variables: {
          _id: ownProps.navigation.state.params.commentID,
        }
      };
    }
  }),
)
class CommentReplyScreen extends Component {
  state = {
    bottom: 0,
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  componentDidMount () {
    this.props.data.subscribeToMore({
      document: COMMENT_ADDED_SUBSCRIPTION,
      variables: {
        postID: this.props.navigation.state.params.postID,
        commentID: this.props.navigation.state.params.commentID,
      },
      updateQuery: (prev, { subscriptionData }) => {
        const newTotalReply = prev.comment.totalReply + 1;
        const newReplies = [...prev.comment.reply, subscriptionData.data.commentAdded];
        return update(prev, { comment : {
          totalReply: { $set: newTotalReply },
          _id: { $set: prev.comment._id },
          reply: { $set: newReplies },
        }});
      }
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({ bottom: Platform.OS === "ios" ? e.endCoordinates.height : 0 });
  }

  _keyboardDidHide = () => {
    this.setState({ bottom: 0 });
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _renderItem = (item) => {
    const { postID } = this.props.navigation.state.params;
    return <FeedComments commentInfo={item.item} postID={postID} canReply={false}/>;
  }

  render() {
    const { commentID, postID } = this.props.navigation.state.params;

    let content;
    const { loading } = this.props.data;
    if (loading) {
      content = <ActivityIndicator size="large"/>;
    }
    else {
      const { reply } = this.props.data.comment;
      content = <FlatList
            contentContainerStyle={{ alignSelf: "stretch" }}
            data={reply}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <Icon type="MaterialIcons" name="arrow-back" style={{fontSize: 20, color: colors.PRIMARY}}/>
            </Button>
          </Left>
          <Body>
            <Title>Reply</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <View style={styles.commentContainer}>
            {content}
          </View>
          <View style={[styles.addCommentContainer, { bottom: this.state.bottom }]}>
            <AddCommentSection postId={postID} commentID={commentID}/>
          </View>
        </View>
      </View>
    );
  }
}

export default CommentReplyScreen;
