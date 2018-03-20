import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card, CardItem } from "native-base";

import { colors } from "../../constants";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottom from "./FeedCardBottom";
import FeedComments from "./FeedComments";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    width: "100%",
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  }
});

const FeedCard = ({_id, message, messagePlainText, author, isLiked, totalComments, totalLikes, createdAt, comments}) => {
  // tuan.tran: temporary parse draft.js structure message

  const text = JSON.parse(message).blocks[0].text;
  const displayText = text.length > 300 ? `${text.substring(0,300)}...` : text;

  const firstComment = totalComments > 0 ? JSON.parse(comments[0].message).blocks[0].text : "";
  const userCommentName = totalComments > 0 ? comments[0].user.username : "";
  const userCommentAvatar = totalComments > 0 ? comments[0].user.profile.picture : "";
  const userCommentCreated = totalComments > 0 ? comments[0].createdAt : "";
  return (
    <Card style={styles.container}>
      <FeedCardHeader {...author} createdAt={createdAt}/>
      <CardItem cardBody style={styles.contentContainer}>
        <Text style={styles.textContent}>
          {messagePlainText}
        </Text>
      </CardItem>
      <FeedCardBottom postID={_id} isLiked={isLiked} totalComments={totalComments} totalLikes={totalLikes}/>
      {totalComments > 0 ? <FeedComments comment={firstComment} name={userCommentName} avatar={userCommentAvatar} createdAt={userCommentCreated}/> : null}
    </Card>
  );
};

export default FeedCard;
