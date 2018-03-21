import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../../constants";
import FeedCardHeader from "../FeedCard/FeedCardHeader";
import PostFeedBack from "./PostFeedBack";

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: 180,
    alignSelf: "stretch",
    padding: 10,
  },
  commentContainer: {
    height: 100,
    alignSelf: "stretch",
  },
  postButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: 15,
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  }
});

class Post extends Component {
  render(){
    const { author, createdAt, messagePlainText, _id, isLiked, totalComments, totalLikes } = this.props.post;
    return (
      <View style={{ flex: 1 }}>
        <FeedCardHeader
          {...author}
          createdAt={createdAt}
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
        <View style={styles.commentContainer} />
        <View style={styles.postButton}/>
      </View>
    );
  }
}

export default Post;
