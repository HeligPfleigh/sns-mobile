import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import { colors } from "../../constants";
import FeedCardHeader from "../FeedCard/FeedCardHeader";
import PostFeedBack from "./PostFeedBack";
import FeedComment from "../FeedCard/FeedComments";

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
  _renderComment = (item) => {
    const { messagePlainText, user, createdAt } = item.item;
    // console.log(user, createdAt);
    // return null;
    return <FeedComment
      comment={messagePlainText}
      name={user.username}
      avatar={user.profile.picture}
      createdAt={createdAt}
      />;
  }

  render(){
    const { author, createdAt, messagePlainText, _id, isLiked, totalComments, totalLikes, comments } = this.props.post;
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
        {totalComments > 0
          ? <FlatList
              data={comments}
              keyExtractor={item => item._id}
              renderItem={this._renderComment}
              />
          : null}
        <View style={styles.commentContainer} />
        <View style={styles.postButton}/>
      </View>
    );
  }
}

export default Post;
