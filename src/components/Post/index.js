import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, Keyboard, Platform } from "react-native";

import { colors } from "../../constants";
import FeedCardHeader from "../FeedCard/FeedCardHeader";
import PostFeedBack from "./PostFeedBack";
import FeedComment from "../FeedCard/FeedComments";
import AddCommentSection from "../AddCommentSection";

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: 180,
    alignSelf: "stretch",
    padding: 10,
  },
  commentContainer: {
    height: Platform.OS === "ios" ? "50%" : "40%",
    alignSelf: "stretch",
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  },
  addCommentContainer: {
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
  },
});

class Post extends Component {
  state = {
    bottom: 0,
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({ bottom: Platform.OS === "ios" ? e.endCoordinates.height : 0});
  }

  _keyboardDidHide = () => {
    this.setState({ bottom: 0 });
  }

  _renderComment = (item) => {
    const { _id } = this.props.post;
    return <FeedComment commentInfo={item.item} postID={_id} canReply={true}/>;
  }

  render(){
    const { author, createdAt, messagePlainText, _id, isLiked, totalComments, totalLikes, comments } = this.props.post;
    return (
      <View style={{ flex: 1 }}>
        <FeedCardHeader
          {...author}
          createdAt={createdAt}
          postId={_id}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.textContent}>
            {messagePlainText}
          </Text>
        </View>
        <PostFeedBack
          postID={_id}
          isLiked={isLiked}
          totalComments={totalComments}
          totalLikes={totalLikes}
          />
        <View style={styles.commentContainer}>
          {totalComments > 0
            ? <FlatList
                data={comments}
                keyExtractor={item => item._id}
                renderItem={this._renderComment}
                />
            : null}
        </View>
        <View style={[styles.addCommentContainer, { bottom: this.state.bottom }]}>
          <AddCommentSection postId={_id} commentID={null}/>
        </View>
      </View>
    );
  }
}

export default Post;
