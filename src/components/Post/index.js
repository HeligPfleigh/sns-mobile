import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, Keyboard } from "react-native";

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
    height: "50%",
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
    top: "90%",
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ top: "48%" });
  }

  _keyboardDidHide = () => {
    this.setState({ top: "90%" });
  }

  _renderComment = (item) => <FeedComment commentInfo={item.item} />

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
        <View style={[styles.addCommentContainer, { top: this.state.top }]}>
          <AddCommentSection postId={_id} commentID={null}/>
        </View>
      </View>
    );
  }
}

export default Post;
